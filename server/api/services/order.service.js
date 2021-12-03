import crypto from 'crypto';
import { database } from '../../common/firebase';
import l from '../../common/logger';
import razorpayInstance from '../../common/razorpay';

class OrderService {
  ordersCollectionRef = database.collection('orders');
  async initializeOrder(
    chefId,
    userId,
    type,
    address,
    numberOfDays,
    numberOfPeople,
    dailySubscriptionAmount
  ) {
    try {
      const plan = await razorpayInstance.plans.create({
        period: 'daily',
        interval: 1,
        item: {
          name: `${userId} subscribed to ${chefId}`,
          amount: dailySubscriptionAmount * 100,
          currency: 'INR',
          description: `${type} - ${address}`,
        },
      });

      const subscription = razorpayInstance.subscriptions.create({
        plan_id: plan.id,
        customer_notify: 1,
        total_count: numberOfDays,
      });

      const orderDocumentRef = await this.ordersCollectionRef.add({
        chefId,
        userId,
        address,
        type,
        paid: false,
        subscriptionId: subscription.id,
        planId: plan.id,
        numberOfDays,
        numberOfPeople,
        totalAmount: dailySubscriptionAmount * numberOfDays,
        dailySubscriptionAmount,
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
        razorpay_payment_id + '|' + order.subscriptionId;
      const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(subscriptionPaymentId)
        .digest('hex');

      if (expectedSignature !== razorpay_signature) {
        throw new Error('Invalid signature');
      }

      await order.ref.update({
        paid: true,
        paidAt: new Date(),
      });
      return { message: 'Subscription successfull' };
    } catch (error) {
      l.error('[ORDERS: VERIFY ORDER]', error);
      throw error;
    }
  }
}

export default new OrderService();
