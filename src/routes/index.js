const express = require('express')
const path = require('path');
const router = express.Router();
const BankRouter = require('./bank')
const BillingResolutionRouter = require('./billing-resolution')
const WarehouseRouter = require('./warehouse');
const TaxesRouter = require('./tax');
const MonetaryDenominationRouter = require('./monetary-denomination');
const ProductAreaRouter = require('./product-area');
const MeasureAreaRouter = require('./measure-unit');
const UserRouter = require('./user');
const AuthRouter = require('./auth');
const PaginationRouter = require('./pagination');
const NotificationRouter = require('./notification');


router.use('/v1/banks', BankRouter);
router.use('/v1/billingResolutions', BillingResolutionRouter);
router.use('/v1/warehouses', WarehouseRouter);
router.use('/v1/taxes', TaxesRouter);
router.use('/v1/monetaryDenominations', MonetaryDenominationRouter);
router.use('/v1/productAreas', ProductAreaRouter);
router.use('/v1/measureUnits', MeasureAreaRouter);
router.use('/v1/users', UserRouter);
router.use('/v1/auth', AuthRouter);
router.use('/v1/page', PaginationRouter);
router.use('/v1/notifications', NotificationRouter)

// prueba socket

router.use('/v1/sockets', (req,res) => {
  res.sendFile(path.join(__dirname, '../../front', 'index.html'));
})

module.exports = router;