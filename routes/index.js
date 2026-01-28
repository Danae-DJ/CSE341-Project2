const router = require('express').Router();

router.get('/', (req, res) => {
  //#swagger.tags=['Wellcome Dear Cliente']
  res.send('Wellcome Dear Cliente');
});

router.use('/products', require('./products'));
router.use('/orders', require('./orders'));

// Swagger SIEMPRE al final
router.use('/', require('./swagger'));

module.exports = router;
