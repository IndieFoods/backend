import { database } from '../../common/firebase';
import l from '../../common/logger';

class AuthService {
  userCollectionRef = database.collection('users');
  chefCollectionRef = database.collection('chefs');
  async signupUser(name, phone, address, email, uid) {
    try {
      const chefUser = await this.chefCollectionRef.doc(uid).get();
      if (chefUser.exists) throw new Error('Already signed up as a chef');
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
      const user = await this.userCollectionRef.doc(uid).get();
      if (user.exists) throw new Error('Already signed up as a foodie');
      await this.chefCollectionRef.doc(uid).set({
        name,
        phone,
        address,
        fssaiId,
        foodTypes,
        profilePicture:
          'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hlZnxlbnwwfHwwfHw%3D&w=1000&q=80',
        pricing: {
          breakfast: 0,
          lunch: 0,
          dinner: 0,
          snacks: 0,
        },
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
