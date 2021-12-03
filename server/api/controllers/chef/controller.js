import ChefService from '../../services/chef.service';

export class Controller {
  async getAllChefDetails(req, res, next) {
    try {
      const chefDetails = await ChefService.getAllChefDetails();
      return res.status(200).json(chefDetails);
    } catch (error) {
      next(error);
    }
  }

  async updateProfilePicture(req, res, next) {
    try {
      const { imageUrl } = req.body;
      if (!imageUrl)
        throw new Error({
          message: 'Image Url is required',
        });
      const response = await ChefService.updateProfilePicture(
        req.user.uid,
        imageUrl
      );
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async updateProfileData(req, res, next) {
    try {
      const { pricing, address, foodTypes } = req.body;
      if (!pricing || !address || foodTypes.length === 0)
        throw new Error({
          message: 'Pricing, Address and Food Types are required',
        });
      const response = await ChefService.updateProfileData(
        req.user.uid,
        pricing,
        address,
        foodTypes
      );
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async createMenuItem(req, res, next) {
    try {
      const { menuItems } = req.body;
      if (menuItems.length === 0)
        throw new Error({
          message: 'Minimum one item is required',
        });
      const response = await ChefService.createMenuItem(
        menuItems,
        req.user.uid
      );
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async updateMenuItem(req, res, next) {
    try {
      const { menuItems } = req.body;
      if (menuItems.length === 0)
        throw new Error({
          message: 'Minimum one item is required',
        });
      const response = await ChefService.updateMenuItem(menuItems);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}

export default new Controller();
