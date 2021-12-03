import express from 'express';
import authHandler from '../../middlewares/auth.handler';
import controller from './controller';

export default express
  .Router()
  .post('/menuItems', authHandler, controller.createMenuItem)
  .put('/menuItems', authHandler, controller.updateMenuItem);
