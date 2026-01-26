const router = require('express').Router();

router.get('/', (req, res) => { res.send('Wellcome Dear Cliente: View the product and place your order') })

router.use('/products', require('./products'));
router.use('/orders', require('./orders'));

module.exports = router;