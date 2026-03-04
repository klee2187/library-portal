const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
 
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
    customJs:'/swagger-auth.js'
}));

router.get('/api-docs/swagger.json', (req, res) => {
    res.json(swaggerDocument);
});
 
module.exports = router;