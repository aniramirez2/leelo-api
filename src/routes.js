const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
const UserController = require('./controllers/UserController');
const BookController = require('./controllers/BookController');
const PaymentsController = require('./controllers/PaymentsController');
const SessionController = require('./controllers/SessionController');
const routes = express.Router();


//--------USER ROUTES ----------
routes.get('/users', UserController.index);

routes.post('/user', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    address: Joi.string().required(),
    phone: Joi.string().required(),
    status: Joi.string().required(),
    role: Joi.string().required(),
    description: Joi.string().required(),
    type: Joi.string().required(),
    objective: Joi.string().required()
  })
}) ,UserController.create);

routes.delete('/user', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required()
  })
}), UserController.delete);

routes.put('/user', celebrate({
  [Segments.BODY]: Joi.object().keys({
    id: Joi.number().required(),
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    address: Joi.string().required(),
    phone: Joi.string().required(),
    status: Joi.string().required(),
    role: Joi.string().required(),
    description: Joi.string().required(),
    type: Joi.string().required(),
    objective: Joi.string().required()
  })
}) ,UserController.update);

//----------------- BOOK ROUTES -------------
routes.get('/books', celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number(),
  })
}), BookController.index);

routes.post('/book', celebrate({
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required(),
    author: Joi.string().required(),
    genre: Joi.string().required(),
    status: Joi.string().required(),
    pages: Joi.string().required(),
    language: Joi.string().required(),
  })}), BookController.create);

routes.delete('/book', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required()
  })
}), BookController.delete);

//------------ PAYMENTS ROUTES ----------
routes.get('/payments', celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number(),
  })
}), PaymentsController.index);

routes.post('/payment', celebrate({
  [Segments.BODY]: Joi.object().keys({
    creditCard: Joi.string().required(),
    cvc: Joi.string().required(),
    value: Joi.string().required(),
    brand: Joi.string().required(),
    name: Joi.string().required(),
    hash: Joi.string().required(),
  })}), PaymentsController.create);

routes.delete('/payment', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required()
  })
}), PaymentsController.delete);

//------------ SESSIONS ROUTES --------------
routes.post('/sessions', celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  })
})  ,SessionController.create);

module.exports = routes;
