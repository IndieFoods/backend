import crypto from 'crypto';
import { database } from '../../common/firebase';
import l from '../../common/logger';
import razorpayInstance from '../../common/razorpay';
import Order from '../../models/order';

class OrderService {
  ordersCollectionRef = database.collection('orders');
  userCollectionRef = database.collection('users');
  chefCollectionRef = database.collection('chefs');

  async initializeOrder(
    chefId,
    userId,
    type,
    isVeg,
    address,
    numberOfWeeks,
    numberOfPeople,
    weeklySubscriptionAmount
  ) {
    try {
      const plan = await razorpayInstance.plans.create({
        period: 'weekly',
        interval: 1,
        item: {
          name: `${userId} subscribed to ${chefId}`,
          amount: weeklySubscriptionAmount * 100,
          currency: 'INR',
          description: `${type} - ${address}`,
        },
      });

      const subscription = await razorpayInstance.subscriptions.create({
        plan_id: plan.id,
        customer_notify: 1,
        total_count: numberOfWeeks,
      });

      const user = await this.userCollectionRef.doc(userId).get();
      const chef = await this.chefCollectionRef.doc(chefId).get();

      const orderDocumentRef = await this.ordersCollectionRef.add({
        chefId,
        userId,
        userName: user.data()?.name,
        chefName: chef.data()?.name,
        userAddress: address,
        chefAddress: chef.data()?.address[0].address,
        chefProfilePicture: chef.data()?.profilePicture,
        type,
        isVeg,
        paid: false,
        subscriptionId: subscription.id,
        planId: plan.id,
        numberOfWeeks,
        numberOfPeople,
        totalAmount: weeklySubscriptionAmount * numberOfWeeks,
        weeklySubscriptionAmount,
        createdAt: new Date(),
      });

      return {
        subscriptionId: subscription.id,
        planId: plan.id,
        orderId: orderDocumentRef.id,
      };
    } catch (error) {
      l.error('[ORDERS: INITIALIZE ORDER]', error);
      throw error;
    }
  }

  async verifyOrder(razorpay_payment_id, razorpay_signature, orderId) {
    try {
      const order = await this.ordersCollectionRef.doc(orderId).get();
      if (!order.exists) {
        throw new Error('Order not found, please try again');
      }

      const subscriptionPaymentId =
        razorpay_payment_id + '|' + order.data()?.subscriptionId;

      const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(subscriptionPaymentId)
        .digest('hex');

      if (expectedSignature === razorpay_signature) {
        await order.ref.update({
          paid: true,
          paidAt: new Date(),
        });
        return { message: 'Subscription successfull' };
      }
      throw new Error('Payment verification failed');
    } catch (error) {
      l.error('[ORDERS: VERIFY ORDER]', error);
      throw error;
    }
  }

  async getPaidOrdersOfAChef(chefId) {
    try {
      const orders = await this.ordersCollectionRef
        .where('chefId', '==', chefId)
        .where('paid', '==', true)
        .get();
      return orders.docs.map(
        (doc) =>
          new Order(
            doc.id,
            doc.data()?.userName,
            doc.data()?.chefName,
            doc.data()?.totalAmount,
            doc.data()?.weeklySubscriptionAmount,
            doc.data()?.numberOfWeeks,
            doc.data()?.numberOfPeople,
            doc.data()?.userAddress,
            doc.data()?.chefAddress,
            doc.data()?.chefProfilePicture,
            doc.data()?.type,
            doc.data()?.isVeg,
            doc.data()?.createdAt
          )
      );
    } catch (error) {
      l.error('[ORDERS: GET PAID ORDERS OF A CHEF]', error);
      throw error;
    }
  }

  async getOrdersOfAUser(userId) {
    try {
      const orders = await this.ordersCollectionRef
        .where('userId', '==', userId)
        .where('paid', '==', true)
        .get();
      return orders.docs.map(
        (doc) =>
          new Order(
            doc.id,
            doc.data()?.userName,
            doc.data()?.chefName,
            doc.data()?.totalAmount,
            doc.data()?.weeklySubscriptionAmount,
            doc.data()?.numberOfWeeks,
            doc.data()?.numberOfPeople,
            doc.data()?.userAddress,
            doc.data()?.chefAddress,
            doc.data()?.chefProfilePicture,
            doc.data()?.type,
            doc.data()?.isVeg,
            doc.data()?.createdAt
          )
      );
    } catch (error) {
      l.error('[ORDERS: GET ORDERS OF A USER]', error);
      throw error;
    }
  }
}

export default new OrderService();
