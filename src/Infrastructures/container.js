/* istanbul ignore file */

const { createContainer } = require('instances-container');

// external lib/dep/agency
const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt');
const pool = require('./database/postgres/pool');

// service (respo, helper, etc)
const UserRepositoryPostgres = require('./repository/UserRepositoryPostgres');
const BcryptPasswordHash = require('./security/BcryptPasswordHash');

// useCase
const AddUserUseCase = require('../Applications/use_case/AddUserUseCase');
const UserRepository = require('../Domains/users/UserRepository');
const PasswordHash = require('../Applications/security/PasswordHash');

// creating container
const container = createContainer();

// registering repo and services
container.register([
  {
    key: UserRepository.name,
    Class: UserRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
        {
          concrete: nanoid,
        },
      ],
    },
  },
  {
    key: PasswordHash.name,
    Class: BcryptPasswordHash,
    parameter: {
      dependencies: [
        {
          concrete: bcrypt,
        },
      ],
    },
  },
]);

// registering use cases
container.register({
  key: AddUserUseCase.name,
  Class: AddUserUseCase,
  parameter: {
    injectType: 'destructuring',
    dependencies: [
      {
        name: 'userRepository',
        internal: UserRepository.name,
      },
      {
        name: 'passwordHash',
        internal: PasswordHash.name,
      },
    ],
  },
});

module.exports = container;
