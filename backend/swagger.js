const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Library Portal',
    description: 'Books and Users API',
  },

  // Use Render URL
  host: 'library-portal-3dzg.onrender.com',
  schemes: ['https'],
};

const outputFile = './swagger.json';
const endpointsFiles = [
  './routes/books.js',
  './routes/users.js',
];

swaggerAutogen(outputFile, endpointsFiles, doc);