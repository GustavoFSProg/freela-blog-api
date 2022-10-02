import { Router } from 'express'
import { isAuthorized } from '../utils/authorize'
import express, { Request, Response } from 'express'


import userController from '../controllers/userController'

const UsersRoute = Router()

UsersRoute.get('/all-user', isAuthorized, userController.getAll),
  // UsersRoute.post('/verify-token', userController.Token)
  UsersRoute.post('/register-user', userController.createUser)
UsersRoute.post('/login',   userController.Login)

export default UsersRoute
