"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _authorize = require('../utils/authorize');



var _userController = require('../controllers/userController'); var _userController2 = _interopRequireDefault(_userController);

const UsersRoute = _express.Router.call(void 0, )

UsersRoute.get('/all-user', _authorize.isAuthorized, _userController2.default.getAll),
  // UsersRoute.post('/verify-token', userController.Token)
  UsersRoute.post('/register-user', _userController2.default.createUser)
UsersRoute.post('/login',   _userController2.default.Login)

exports. default = UsersRoute
