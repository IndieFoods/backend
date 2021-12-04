import MenuItemService from '../../services/menuItem.service';

export class Controller {
  async getAllMenuItems(req, res, next) {
    try {
      const menuItems = await MenuItemService.getAllMenuItems();
      res.status(200).json(menuItems);
    } catch (err) {
      next(err);
    }
  }

  async getAllMenuItemsOfAChef(req, res, next) {
    try {
      const menuItems = await MenuItemService.getAllMenuItemsOfAChef(
        req.params.chefId
      );
      res.status(200).json(menuItems);
    } catch (error) {
      next(error);
    }
  }
}

export default new Controller();
