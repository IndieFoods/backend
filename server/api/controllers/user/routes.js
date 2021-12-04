import express from 'express';
import authHandler from '../../middlewares/auth.handler';
import controller from './controller';

export default express
  .Router()
  .put('/updateAddress', authHandler, controller.updateAddress);
