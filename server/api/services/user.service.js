import { database } from '../../common/firebase';
import l from '../../common/logger';
import User from '../../models/user';

class UserService {
  userCollectionRef = database.collection('users');
  async getUserDetails(uid) {
    try {
      const userRef = this.userCollectionRef.doc(uid);
      const user = await userRef.get();
      return new User(
        user.id,
        user.data()?.name,
        user.data()?.phone,
        user.data()?.address,
        user.data()?.email
      );
    } catch (error) {
      l.error('[USER: GET USER DETAILS]', error);
      throw error;
    }
  }

  async updateAddress(uid, address) {
    try {
      await this.userCollectionRef.doc(uid).update({
        address: address,
      });
      return { message: 'Address added/updated successfully' };
    } catch (error) {
      l.error('[USER: ADD/UPDATE ADDRESS]', error);
      throw error;
    }
  }
}

export default new UserService();
