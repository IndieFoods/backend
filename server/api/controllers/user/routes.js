import express from 'express';
import authHandler from '../../middlewares/auth.handler';
import controller from './controller';

export default express
  .Router()
  .get('/', authHandler, controller.getUserDetails)
  .post('/updateAddress', authHandler, controller.updateAddress);
