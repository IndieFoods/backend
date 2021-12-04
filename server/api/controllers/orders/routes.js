import express from 'express';
import authHandler from '../../middlewares/auth.handler';
import controller from './controller';

export default express
  .Router()
  .get('/getOrdersOfAUser', authHandler, controller.getOrdersOfAUser)
  .get('/getPaidOrdersOfAChef', authHandler, controller.getPaidOrdersOfAChef)
  .post('/initializeOrder', authHandler, controller.initializeOrder)
  .post('/verifyOrder', authHandler, controller.verifyOrder);
