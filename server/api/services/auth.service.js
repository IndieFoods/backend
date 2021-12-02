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
      console.log(error);
      l.error('[SIGNUP SERVICE USER]', error);
    }
  }
  async signupChef(name, phone, address, fssaiId, email, uid) {
    try {
      await this.chefCollectionRef.doc(uid).set({
        name,
        phone,
        address,
        fssaiId,
        email,
        isChef: true,
        createdAt: new Date(),
      });
      return { message: 'Chef registered successfully' };
    } catch (error) {
      console.log(error);
      l.error('[SIGNUP SERVICE CHEF]', error);
    }
  }
}

export default new AuthService();
