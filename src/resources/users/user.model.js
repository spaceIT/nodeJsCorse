const uuid = require('uuid').v4;

/**
 * @typedef IUserWithoutPassword
 * @property {string} id - ID of the user
 * @property {string} login - LOGIN of the user
 * @property {string} name - NAME of the user
 */

/**
 * @typedef {IUserWithoutPassword} IUser
 * @property {string} password - PASSWORD of the user
 */
class User {

  /**
   * @param {IUser} - User information
   */
  constructor({
    id = uuid(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd'
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  /**
   * @static {function} toResponse -Remove password from User object
   * @param {IUser} user - User object
   * @returns {IUserWithoutPassword}
   */
  static toResponse(user) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

module.exports = User;
