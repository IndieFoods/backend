import { database } from '../../common/firebase';
import l from '../../common/logger';
import MenuItem from '../../models/MenuItem';

class MenuItemService {
  menuItemsCollectionRef = database.collection('menuItems');
  async getAllMenuItems() {
    try {
      const menuItems = await this.menuItemsCollectionRef.get();
      return menuItems.docs.map((doc) => {
        return new MenuItem(
          doc.id,
          doc.data()?.chefId,
          doc.data()?.name,
          doc.data()?.image,
          doc.data()?.isVeg,
          doc.data()?.type
        );
      });
    } catch (error) {
      l.error('[GET ALL MENU ITEMS]', error);
      throw error;
    }
  }

  async getAllMenuItemsOfAChef(uid) {
    try {
      const menuItems = await this.menuItemsCollectionRef
        .where('chefId', '==', uid)
        .get();
      return menuItems.docs.map((doc) => {
        return new MenuItem(
          doc.id,
          doc.data()?.name,
          doc.data()?.image,
          doc.data()?.isVeg,
          doc.data()?.type
        );
      });
    } catch (error) {
      l.error('[CHEF: GET ALL MENU ITEMS OF A CHEF]', error);
      throw error;
    }
  }
}

export default new MenuItemService();
