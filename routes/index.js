const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    //#swagger.tags=['Wellcome Dear Cliente']
    res.send('Wellcome Dear Cliente');
})

router.use('/products', require('./products'));
router.use('/orders', require('./orders'));

module.exports = router;