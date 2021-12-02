import express from 'express';
import authHandler from '../../middlewares/auth.handler';
import controller from './controller';

export default express
  .Router()
  .post('/signup-user', authHandler, controller.signupUser)
  .post('/signup-chef', authHandler, controller.signupChef);
