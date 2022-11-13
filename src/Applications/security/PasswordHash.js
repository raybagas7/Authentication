/* eslint class-methods-use-this: ["error",
{ "exceptMethods": ["hash"] }] */
/* eslint-disable no-unused-vars */
class PasswordHash {
  async hash(password) {
    throw new Error('PASSWORD_HASH.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = PasswordHash;
