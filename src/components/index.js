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
const PreparationComponent = require('./product/modules/preparation');
const PreparationTypeComponent = require('./product/modules/preparation-type');
const ChatComponent = require('../shared/modules/chat');
const EventComponent = require('../shared/modules/event');
const FileComponent = require('../shared/modules/file');
const MessageComponent = require('../shared/modules/chat/message');
const ReportTypeComponent = require('../shared/modules/report-type');
const SupportTicketComponent = require('../shared/modules/support-ticket');
const TicketThreadComponent = require('../shared/modules/ticket-thread');
const EconomicActivitieComponent = require('./third-parties/modules/economic-activities');
const FiscalResponsibilityComponent = require('./third-parties/modules/fiscal-responsibility');

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
  UnitMeasurementComponent,
  PreparationComponent,
  PreparationTypeComponent,
  ChatComponent,
  EventComponent,
  FileComponent,
  MessageComponent,
  ReportTypeComponent,
  SupportTicketComponent,
  TicketThreadComponent,
  EconomicActivitieComponent,
  FiscalResponsibilityComponent
}