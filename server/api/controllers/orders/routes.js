import express from 'express';
import authHandler from '../../middlewares/auth.handler';
import controller from './controller';

export default express
  .Router()
  .post('/initializeOrder', authHandler, controller.initializeSubscription)
  .post('/verifyOrder', authHandler, controller.verifyOrder);
