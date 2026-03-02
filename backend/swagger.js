const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Library Portal',
    description: 'Books and Users API',
  },

  // Use Render URL
  // Add security to tell swagger to use session cookie for authentication 
  host: process.env.NODE_ENV === 'production'
  ? 'library-portal-3dzg.onrender.com'
  : 'localhost:8080',
  schemes: process.env.NODE_ENV === 'production' 
  ? ['https']
  : ['http'],
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
      description: 'Enter: Bearer {your JWT token}'
      
    }
  },
  security: [
    {
      bearerAuth: []
    }
  ]
};

const outputFile = './swagger.json';
const endpointsFiles = [
  './routes/books.js',
  './routes/users.js',
];

swaggerAutogen(outputFile, endpointsFiles, doc);