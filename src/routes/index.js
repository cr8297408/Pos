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
const ProductStructureRouter = require('./product-structure');
const ProductLinesRouter = require('./product-line');
const PreparationTypesRouter = require('./preparation-types');
const PreparationRouter = require('./preparation');
const ProductCategoryRouter = require('./product-category');
const ProductGroupRouter = require('./product-group');
const EventRouter = require('./event');
const FileRouter = require('./file');
const ReportTypeRouter = require('./report-type');
const SupportTicketRouter = require('./support-ticket');
const TicketThreadRouter = require('./ticket-thread');
const ChatRouter = require('./chat');
const MessagesRouter = require('./message');
const EconomicActivitiesRouter = require('./economic-activitie');
const FiscalResponsibilityRouter = require('./fiscal-responsibility');
const ProductRouter = require('./product');
const PriceByVolumeRouter = require('./price-by-volume');
const ProductMenuRouter = require('./product-menu');
const ProductParamRouter = require('./product-param');
const ProductSalePriceRouter = require('./product-sale-price');
const TaxesAndCostRouter = require('./taxes-and-cost');
const ProductCurveRouter = require('./product-curve');


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
router.use('/v1/notifications', NotificationRouter);
router.use('/v1/productStructures', ProductStructureRouter);
router.use('/v1/productLines', ProductLinesRouter);
router.use('/v1/preparationTypes', PreparationTypesRouter);
router.use('/v1/preparations', PreparationRouter);
router.use('/v1/productCategorys',ProductCategoryRouter);
router.use('/v1/productGroups', ProductGroupRouter);
router.use('/v1/events', EventRouter);
router.use('/v1/files', FileRouter);
router.use('/v1/reportTypes', ReportTypeRouter);
router.use('/v1/supportTickets', SupportTicketRouter);
router.use('/v1/ticketThreads', TicketThreadRouter);
router.use('/v1/chats', ChatRouter);
router.use('/v1/messages', MessagesRouter);
router.use('/v1/economicActivities', EconomicActivitiesRouter);
router.use('/v1/fiscalResponsibilitys', FiscalResponsibilityRouter);
router.use('/v1/products', ProductRouter);
router.use('/v1/priceByVolumes', PriceByVolumeRouter);
router.use('/v1/productMenus', ProductMenuRouter);
router.use('/v1/productParams', ProductParamRouter);
router.use('/v1/productSalePrices', ProductSalePriceRouter);
router.use('/v1/taxesAndCosts', TaxesAndCostRouter);
router.use('/v1/productCurves', ProductCurveRouter);


// prueba socket

router.use('/v1/sockets', (req,res) => {
  res.sendFile(path.join(__dirname, '../../front', 'index.html'));
})

module.exports = router;