import AuthService from '../../services/auth.service';

export class Controller {
  async signupUser(req, res, next) {
    try {
      const { name, phone, address, email } = req.body;
      if (!name || address.length === 0 || !phone)
        throw new Error({
          message: 'Please fill all necessary fields',
        });
      const response = await AuthService.signupUser(
        name,
        phone,
        address,
        email,
        req.user.uid
      );
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
  async signupChef(req, res, next) {
    try {
      const { name, phone, address, fssaiId, foodTypes, email } = req.body;
      if (
        !name ||
        address.length === 0 ||
        foodTypes.length === 0 ||
        !phone ||
        !fssaiId
      )
        throw new Error({
          message: 'Please fill all necessary fields',
        });
      const response = await AuthService.signupChef(
        name,
        phone,
        address,
        fssaiId,
        foodTypes,
        email,
        req.user.uid
      );
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async getUserDetails(req, res, next) {
    try {
      const user = await AuthService.getUser(req.user.uid);
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }
}

export default new Controller();
