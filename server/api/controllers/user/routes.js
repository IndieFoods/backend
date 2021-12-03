import express from 'express';
import authHandler from '../../middlewares/auth.handler';
import controller from './controller';

export default express
  .Router()
  .post('/updateAddress', authHandler, controller.updateAddress);
