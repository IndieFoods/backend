import { database } from '../../common/firebase';
import l from '../../common/logger';

class AuthService {
  userCollectionRef = database.collection('users');
  chefCollectionRef = database.collection('chefs');
  async signupUser(name, phone, address, email, uid) {
    try {
      await this.userCollectionRef.doc(uid).set({
        name,
        phone,
        address,
        email,
        createdAt: new Date(),
      });
      return { message: 'User registered successfully' };
    } catch (error) {
      l.error('[SIGNUP SERVICE USER]', error);
      throw error;
    }
  }
  async signupChef(name, phone, address, fssaiId, foodTypes, email, uid) {
    try {
      await this.chefCollectionRef.doc(uid).set({
        name,
        phone,
        address,
        fssaiId,
        foodTypes,
        email,
        isChef: true,
        createdAt: new Date(),
      });
      return { message: 'Chef registered successfully' };
    } catch (error) {
      l.error('[SIGNUP SERVICE CHEF]', error);
      throw error;
    }
  }

  async getUser(uid) {
    try {
      const user = await this.userCollectionRef.doc(uid).get();
      const chef = await this.chefCollectionRef.doc(uid).get();
      if (user.exists) {
        return user.data();
      } else if (chef.exists) {
        return chef.data();
      } else {
        throw new Error('User not found');
      }
    } catch (error) {
      l.error('[GET USER]', error);
      throw error;
    }
  }
}

export default new AuthService();
