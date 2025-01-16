const ClientError = require('./ClientError');

class AuthenticationError extends ClientError {
  constructor(message) {
    super(message, 401);
    this.name = 'AuthenticationError'; // sesuaikan dengan nama class
  }
}

module.exports = AuthenticationError;
