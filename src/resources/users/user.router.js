const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

/**
 * @name GET_ALL_USERS
 * @memberOf module:UsersRouter
 * @function
 * @route {GET} /users/
 * @returns {IUser[]|Array} Array of user objects or empty array
 */
router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();

  res.json(users.map(User.toResponse));
});

/**
 * @name CREATE_USER
 * @memberOf module:UsersRouter
 * @function
 * @route {POST} /users/
 * @returns {IUser} created user
 */
router.route('/').post(async (req, res) => {
  const user = await usersService.createUser(req.body);

  res.status(201).send(User.toResponse(user));
});

/**
 * @name GET_USER_BY_ID
 * @memberOf module:UsersRouter
 * @function
 * @route {GET} /users/:id
 * @returns {IUser|string} User object or string if not found
 */
router.route('/:id').get(async (req, res) => {
  const user = await usersService.getById(req.params.id);

  res.json(User.toResponse(user));
});

/**
 * @name DELETE_USER_BY_ID
 * @memberOf module:UsersRouter
 * @function
 * @route {DELETE} /users/:id
 * @returns {IUser|string} deleted user or string if not found
 */
router.route('/:id').delete(async (req, res) => {
  await usersService.deleteById(req.params.id);

  res.status(204).send('User deleted');
});

/**
 * @name UPDATE_USER_BY_ID
 * @memberOf module:UsersRouter
 * @function
 * @route {PUT} /users/:id
 * @returns {IUser|string} updated user or string if not found
 */
router.route('/:id').put(async (req, res) => {
  const user = await usersService.updateById(req.params.id, req.body);

  res.status(200).send(User.toResponse(user));
});

module.exports = router;
