import express from 'express';
import authHandler from '../../middlewares/auth.handler';
import controller from './controller';

export default express
  .Router()
  .get('/', controller.getAllMenuItems)
  .get('/:chefId', controller.getAllMenuItemsOfAChef);
