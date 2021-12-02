import UserService from '../../services/user.service';

export class Controller {
  async getUserDetails(req, res, next) {
    try {
      const user = await UserService.getUserDetails(req.user.uid);
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }

  async addAddress(req, res, next) {
    try {
      const { address } = req.body;
      if (address.length === 0)
        throw new Error({
          message: 'Minimum one address is required',
        });
      const response = await UserService.addAddress(req.user.uid, address);
      res.status(200).json(response);
    } catch (error) {
      return next(error);
    }
  }
}

export default new Controller();
