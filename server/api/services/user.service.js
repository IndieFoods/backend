import { database } from '../../common/firebase';

class UserService {
  userCollectionRef = database.collection('users');
  async addAddress(uid, address) {
    try {
      await this.userCollectionRef.doc(uid).update({
        address: address,
      });
      return { message: 'Address added successfully' };
    } catch (error) {
      console.log(error);
    }
  }
}

export default new UserService();
