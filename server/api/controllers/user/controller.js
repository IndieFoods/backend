import UserService from '../../services/user.service';

export class Controller {
  async updateAddress(req, res, next) {
    try {
      const { address } = req.body;
      if (address.length === 0)
        throw new Error({
          message: 'Minimum one address is required',
        });
      const response = await UserService.updateAddress(req.user.uid, address);
      res.status(200).json(response);
    } catch (error) {
      return next(error);
    }
  }
}

export default new Controller();
