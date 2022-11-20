const Hapi = require('@hapi/hapi');
const ClientError = require('../../Commons/exceptions/ClientError');
const DomainErrorTranslator = require('../../Commons/exceptions/DomainErrorTranslator');
const users = require('../../Interfaces/http/api/users');

const createServer = async (container) => {
  const server = Hapi.server({
    host: process.env.HOST,
    port: process.env.PORT,
  });

  await server.register([
    {
      plugin: users,
      options: {
        container,
      },
    },
  ]);

  server.ext('onPreResponse', (request, h) => {
    // get response context
    const { response } = request;

    if (response instanceof Error) {
      // handle the error with right response
      const translatedError = DomainErrorTranslator.translate(response);

      // handling internal client error
      if (translatedError instanceof ClientError) {
        const newResponse = h.response({
          status: 'fail',
          message: translatedError.message,
        });
        newResponse.code(translatedError.statusCode);
        return newResponse;
      }

      // mantain native client error handling like 404, etc
      if (!translatedError.isServer) {
        return h.continue;
      }

      // handle the error with right response
      const newResponse = h.response({
        status: 'error',
        message: 'maaf terjadi kegagalan pada server kami',
      });
      newResponse.code(500);
      return newResponse;
    }

    // if error not accoured, continue with prev response (with no intervened)
    return h.continue;
  });

  return server;
};

module.exports = createServer;
