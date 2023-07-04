"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmptyBagAppModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("../../auth/auth.module");
const date_time_service_1 = require("../../common/services/date-time/date-time.service");
const empty_bag_store_data_controller_1 = require("./controllers/empty-bag-store-data/empty-bag-store-data.controller");
const query_procedures_module_1 = require("./query-procedures/query-procedures.module");
const empty_bag_store_data_service_1 = require("./services/empty-bag-store-data/empty-bag-store-data.service");
let EmptyBagAppModule = class EmptyBagAppModule {
};
EmptyBagAppModule = __decorate([
    (0, common_1.Module)({
        imports: [query_procedures_module_1.QueryProceduresModule, auth_module_1.AuthModule],
        controllers: [empty_bag_store_data_controller_1.EmptyBagStoreDataController],
        providers: [empty_bag_store_data_service_1.EmptyBagStoreDataService, date_time_service_1.DateTimeService],
    })
], EmptyBagAppModule);
exports.EmptyBagAppModule = EmptyBagAppModule;
//# sourceMappingURL=empty-bag-app.module.js.map