const BankComponent = require('./bank')
const BillingResolutionComponent = require('./billing-resolution')
const WarehouseComponent = require('./warehouse')
const TaxComponent = require('./tax');
const MonetaryDenominationComponent = require('./monetary-denomination');
const ProductAreaComponent = require('./product-area');
const MeasureUnitComponent = require('./measure-unit');
const UserComponent = require('../shared/modules/user');
const AuthComponent = require('../shared/modules/auth');
const NotificationComponent = require('../shared/modules/notification');
const ProductStructureComponent = require('./product-structure');
const ProductLineComponent = require('./product-line');

module.exports = { 
  BankComponent, 
  BillingResolutionComponent, 
  WarehouseComponent,
  TaxComponent,
  MonetaryDenominationComponent,
  ProductAreaComponent,
  MeasureUnitComponent,
  UserComponent,
  AuthComponent,
  NotificationComponent,
  ProductStructureComponent,
  ProductLineComponent
}