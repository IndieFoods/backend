import express from 'express';
import authHandler from '../../middlewares/auth.handler';
import controller from './controller';

export default express
  .Router()
  .put('/updateProfilePicture', authHandler, controller.updateProfilePicture)
  .put('/updateProfileData', authHandler, controller.updateProfileData)
  .post('/menuItems', authHandler, controller.createMenuItem)
  .put('/menuItems', authHandler, controller.updateMenuItem);
