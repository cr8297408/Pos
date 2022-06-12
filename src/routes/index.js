const express = require('express')
const router = express.Router();
const BankRouter = require('./bank')
const BillingResolutionRouter = require('./billing-resolution')
const WarehouseRouter = require('./warehouse');
const TaxesRouter = require('./tax');
const MonetaryDenominationRouter = require('./monetary-denomination');
const ProductAreaRouter = require('./product-area');
const MeasureAreaRouter = require('./measure-unit');
const UserRouter = require('./user');


router.use('/v1/banks', BankRouter);
router.use('/v1/billingResolution', BillingResolutionRouter);
router.use('/v1/warehouses', WarehouseRouter);
router.use('/v1/taxes', TaxesRouter);
router.use('/v1/monetaryDenominations', MonetaryDenominationRouter);
router.use('/v1/productAreas', ProductAreaRouter);
router.use('/v1/measureUnits', MeasureAreaRouter);
router.use('/v1/users', UserRouter)

module.exports = router;