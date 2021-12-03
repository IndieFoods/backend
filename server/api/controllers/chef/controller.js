import ChefService from '../../services/chef.service';

export class Controller {
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
