const router = require('express').Router();

/*router.get('/', (req, res) => {
  //#swagger.tags=['Wellcome Dear Cliente']
  res.send('Wellcome Dear Cliente');
});*/

router.use('/products', require('./products'));
router.use('/orders', require('./orders'));

// Swagger SIEMPRE al final
router.use('/', require('./swagger'));

router.get('/login', function (req, res, next) {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

module.exports = router;
