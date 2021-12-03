import { database } from '../../common/firebase';
import l from '../../common/logger';

class ChefService {
  menuItemsCollectionRef = database.collection('menuItems');
  async createMenuItem(menuItems, uid) {
    try {
      menuItems.map(async (menuItem) => {
        await this.menuItemsCollectionRef.add({
          name: menuItem.name,
          image: menuItem.image,
          isVeg: menuItem.isVeg,
          type: menuItem.type,
          chefId: uid,
        });
      });
      return { message: 'Menu items added successfully' };
    } catch (error) {
      l.error('[CHEF: CREATE MENU ITEM]', error);
      throw error;
    }
  }

  async updateMenuItem(menuItems) {
    try {
      menuItems.map(async (menuItem) => {
        await this.menuItemsCollectionRef.doc(menuItem.id).update({
          name: menuItem.name,
          image: menuItem.image,
          isVeg: menuItem.isVeg,
          type: menuItem.type,
        });
      });
      return { message: 'Menu item updated successfully' };
    } catch (error) {
      l.error('[CHEF: UPDATE MENU ITEM]', error);
      throw error;
    }
  }
}

export default new ChefService();
