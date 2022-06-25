const BankComponent = require('./bank')
const BillingResolutionComponent = require('./billing-resolution')
const WarehouseComponent = require('./warehouse')
const TaxComponent = require('./tax');
const MonetaryDenominationComponent = require('./monetary-denomination');
const MeasureUnitComponent = require('./measure-unit');
const UserComponent = require('../shared/modules/user');
const AuthComponent = require('../shared/modules/auth');
const NotificationComponent = require('../shared/modules/notification');
const ProductAreaComponent = require('./product/modules/product-area');
const ProductStructureComponent = require('./product/modules/product-structure');
const ProductLineComponent = require('./product/modules/product-line');
const ProductCategoryComponent = require('./product/modules/product-category');
const ProductGroupComponent = require('./product/modules/product-group');
const UnitMeasurementComponent = require('./product/modules/unit-measurement');


module.exports = { 
  BankComponent, 
  BillingResolutionComponent, 
  WarehouseComponent,
  TaxComponent,
  MonetaryDenominationComponent,
  MeasureUnitComponent,
  UserComponent,
  AuthComponent,
  NotificationComponent,
  ProductStructureComponent,
  ProductAreaComponent,
  ProductLineComponent,
  ProductCategoryComponent,
  ProductGroupComponent,
  UnitMeasurementComponent
}