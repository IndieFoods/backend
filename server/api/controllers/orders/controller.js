import OrderService from '../../services/order.service';

export class Controller {
  async initializeOrder(req, res, next) {
    try {
      const {
        chefId,
        type,
        isVeg,
        address,
        numberOfDays,
        numberOfPeople,
        dailySubscriptionAmount,
      } = req.body;
      if (
        !chefId ||
        !type ||
        !address ||
        !numberOfDays ||
        !numberOfPeople ||
        !dailySubscriptionAmount
      )
        throw new Error('Missing required fields');
      const reponse = await OrderService.initializeOrder(
        chefId,
        req.user.uid,
        type,
        isVeg,
        address,
        numberOfDays,
        numberOfPeople,
        dailySubscriptionAmount
      );
      res.status(200).json(reponse);
    } catch (error) {
      next(error);
    }
  }

  async verifyOrder(req, res, next) {
    try {
      const { razorpay_payment_id, razorpay_signature, orderId } = req.body;
      if (!razorpay_payment_id || !razorpay_signature || !orderId)
        throw new Error('Payment verification failed');
      const response = await OrderService.verifyOrder(
        razorpay_payment_id,
        razorpay_signature,
        orderId
      );
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async getPaidOrdersOfAChef(req, res, next) {
    try {
      const ordersData = await OrderService.getPaidOrdersOfAChef(req.user.uid);
      res.status(200).json(ordersData);
    } catch (error) {
      next(error);
    }
  }

  async getOrdersOfAUser(req, res, next) {
    try {
      const ordersData = await OrderService.getOrdersOfAUser(req.user.uid);
      res.status(200).json(ordersData);
    } catch (error) {
      next(error);
    }
  }
}

export default new Controller();
