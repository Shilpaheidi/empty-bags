"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmptyBagStoreDataController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../../../auth/guard/jwt-auth.guard");
const auth_service_1 = require("../../../../auth/services/auth.service");
const empty_bagid_dto_1 = require("../../../../models/dto/empty-bagid.dto");
const empty_bag_store_data_service_1 = require("../../services/empty-bag-store-data/empty-bag-store-data.service");
let EmptyBagStoreDataController = class EmptyBagStoreDataController {
    constructor(appService, _authService) {
        this.appService = appService;
        this._authService = _authService;
    }
    async deleteRecords(ids, audit, request) {
        try {
            let token = String(request.headers.authorization).replace('Bearer ', '');
            let _data = await this._authService
                .verifyJwt(token)
                .then((data) => data.user);
            const { camp_id, country_code, time_zone_iana_string, } = _data;
            await this.appService.deleteRecords(ids, audit, country_code, camp_id, time_zone_iana_string);
            return {
                status: 200,
                message: 'Bag Id deleted successfully',
            };
        }
        catch (error) {
            throw error;
        }
    }
    async postingEmptyOuterBagID(bag_id, request) {
        try {
            let token = String(request.headers.authorization).replace('Bearer ', '');
            let _data = await this._authService
                .verifyJwt(token)
                .then((data) => data.user);
            const { country_code, camp_id } = _data;
            let au = await this.appService.postingEmptyOuterBagID(bag_id, country_code, camp_id);
            if (au) {
                return {
                    statusCode: common_1.HttpStatus.OK,
                    message: 'Outer Bag, Fetched Successfully!',
                    data: au,
                };
            }
            else {
                return {
                    statusCode: common_1.HttpStatus.OK,
                    message: 'Outer Bag, You Entered Does Not Exist!',
                    data: 'Null',
                };
            }
        }
        catch (error) {
            throw error;
        }
    }
    async postingEmptyOuterBagIDInsert(bag_id, audit, request) {
        try {
            let token = String(request.headers.authorization).replace('Bearer ', '');
            let _data = await this._authService
                .verifyJwt(token)
                .then((data) => data.user);
            const { country_code, camp_id, time_zone_iana_string, } = _data;
            console.log(request.headers.authorization);
            let au = await this.appService.postingEmptyOuterBagIDInsert(bag_id, audit, country_code, camp_id, time_zone_iana_string);
            if (au) {
                return {
                    statusCode: common_1.HttpStatus.OK,
                    message: 'Outer Bag ID, Fetched Successfully!',
                    data: au,
                };
            }
            else {
                return {
                    statusCode: common_1.HttpStatus.OK,
                    message: 'Outer Bag, You Entered Does Not Exist!',
                    data: 'Null',
                };
            }
        }
        catch (error) {
            throw error;
        }
    }
    async postingEmptyInnerBagIDInsert(bag_id, audit, request) {
        try {
            let token = String(request.headers.authorization).replace('Bearer ', '');
            let _data = await this._authService
                .verifyJwt(token)
                .then((data) => data.user);
            const { country_code, camp_id, time_zone_iana_string, } = _data;
            let au = await this.appService.postingEmptyInnerBagIDInsert(bag_id, audit, country_code, camp_id, time_zone_iana_string);
            if (au) {
                return {
                    statusCode: common_1.HttpStatus.OK,
                    message: 'Inner Bag ID, Fetched Successfully!',
                    data: au,
                };
            }
            else {
                return {
                    statusCode: common_1.HttpStatus.OK,
                    message: 'Inner Bag ID, You Entered Does Not Exist!',
                    data: 'Null',
                };
            }
        }
        catch (error) {
            throw error;
        }
    }
    async postingEmptyInnerBagID(bag_id, request) {
        try {
            let token = String(request.headers.authorization).replace('Bearer ', '');
            let _data = await this._authService
                .verifyJwt(token)
                .then((data) => data.user);
            const { country_code, camp_id } = _data;
            let au = await this.appService.postingEmptyInnerBagID(bag_id, country_code, camp_id);
            if (au) {
                return {
                    statusCode: common_1.HttpStatus.OK,
                    message: 'Inner Bag ID, Fetched Successfully!',
                    data: au,
                };
            }
            else {
                return {
                    statusCode: common_1.HttpStatus.OK,
                    message: 'Inner Bag ID, You Entered Does Not Exist!',
                    data: 'Null',
                };
            }
        }
        catch (error) {
            throw error;
        }
    }
    async checkingOuterBagidExistOrNot(bag_id, audit, request) {
        try {
            let token = String(request.headers.authorization).replace('Bearer ', '');
            let _data = await this._authService
                .verifyJwt(token)
                .then((data) => data.user);
            const { country_code, camp_id, time_zone_iana_string, } = _data;
            let au = await this.appService.checkingOuterBagidExistOrNot(bag_id, audit, country_code, camp_id, time_zone_iana_string);
            if (au) {
                return {
                    statusCode: common_1.HttpStatus.OK,
                    message: 'Outer Bag ID, Fetched Successfully!',
                    data: au,
                };
            }
            else {
                return {
                    statusCode: common_1.HttpStatus.OK,
                    message: 'Outer Bag ID, You Entered Does Not Exist!',
                    data: 'Null',
                };
            }
        }
        catch (error) {
            throw error;
        }
    }
    async verifyingEmptyInnerBagID(bag_id, audit, request) {
        try {
            let token = String(request.headers.authorization).replace('Bearer ', '');
            let _data = await this._authService
                .verifyJwt(token)
                .then((data) => data.user);
            const { country_code, camp_id, time_zone_iana_string, } = _data;
            let au = await this.appService.verifyingEmptyInnerBagID(bag_id, audit, country_code, camp_id, time_zone_iana_string);
            if (au) {
                return {
                    statusCode: common_1.HttpStatus.OK,
                    message: 'Inner Bag ID, Fetched Successfully!',
                    data: au,
                };
            }
            else {
                return {
                    statusCode: common_1.HttpStatus.OK,
                    message: 'Inner Bag ID, You Entered Does Not Exist!',
                    data: 'Null',
                };
            }
        }
        catch (error) {
            throw error;
        }
    }
    async verifyingOuterBagID(bag_id, request) {
        try {
            let token = String(request.headers.authorization).replace('Bearer ', '');
            let _data = await this._authService
                .verifyJwt(token)
                .then((data) => data.user);
            const { country_code, camp_id } = _data;
            let au = await this.appService.verifyingOuterBagID(bag_id, country_code, camp_id);
            if (au) {
                return {
                    statusCode: common_1.HttpStatus.OK,
                    message: 'Outer Bag ID, Fetched Successfully!',
                    data: au,
                };
            }
            else {
                return {
                    statusCode: common_1.HttpStatus.OK,
                    message: 'Outer Bag ID, You Entered Does Not Exist!',
                    data: 'Null',
                };
            }
        }
        catch (error) {
            throw error;
        }
    }
    async wow_education_coordinator_syllabus_details_audit_trail(pageno, per_page) {
        try {
            const get_audit_trail_data = await this.appService.getAuditTrail(pageno, per_page);
            const results = get_audit_trail_data.getster_ids.map((result) => ({
                user_name: result.user_name,
                entry_by_user_id: result.entry_by_user_id,
                entry_type: result.entry_type,
                entry_date_time: result.entry_date_time,
            }));
            const count = get_audit_trail_data.count;
            return {
                statuscode: common_1.HttpStatus.OK,
                message: "Get Data Successful",
                count: count,
                data: results,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async getAuditTrailVerify(pageno, per_page) {
        try {
            const get_audit_trail_data = await this.appService.getAuditTrailVerify(pageno, per_page);
            const results = get_audit_trail_data.getster_ids.map((result) => ({
                user_name: result.user_name,
                entry_by_user_id: result.entry_by_user_id,
                entry_type: result.entry_type,
                entry_date_time: result.entry_date_time,
            }));
            const count = get_audit_trail_data.count;
            return {
                statuscode: common_1.HttpStatus.OK,
                message: "Get Data Successful",
                count: count,
                data: results,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async getToken() {
        try {
            let payload = {
                country_code: 'in',
                camp_id: 12,
                time_zone_iana_string: "Asia/Kolkata"
            };
            let token = await this._authService.generateJwt(payload);
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Get token Successful',
                data: token
            };
        }
        catch (error) {
            throw error;
        }
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Delete)('delete-records'),
    __param(0, (0, common_1.Query)('ids')),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, empty_bagid_dto_1.VerifyAuditTrailDto, Object]),
    __metadata("design:returntype", Promise)
], EmptyBagStoreDataController.prototype, "deleteRecords", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Post)('posting-empty-outer-bag-id'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [empty_bagid_dto_1.EmptyBagIdNewScanDTO, Object]),
    __metadata("design:returntype", Promise)
], EmptyBagStoreDataController.prototype, "postingEmptyOuterBagID", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Post)('posting-empty-outer-bag-id-insert'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [empty_bagid_dto_1.EmptyBagIdNewDTO, empty_bagid_dto_1.VerifyAuditTrailDto, Object]),
    __metadata("design:returntype", Promise)
], EmptyBagStoreDataController.prototype, "postingEmptyOuterBagIDInsert", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Post)('posting-empty-inner-bag-id_insert'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [empty_bagid_dto_1.EmptyBagIdNewDTO, empty_bagid_dto_1.VerifyAuditTrailDto, Object]),
    __metadata("design:returntype", Promise)
], EmptyBagStoreDataController.prototype, "postingEmptyInnerBagIDInsert", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Post)('posting-empty-inner-bag-id'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [empty_bagid_dto_1.EmptyBagIdNewInsertDTO, Object]),
    __metadata("design:returntype", Promise)
], EmptyBagStoreDataController.prototype, "postingEmptyInnerBagID", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Post)('checking-outer-bagid-exist-or-not'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [empty_bagid_dto_1.EmptyBagIdVerifyDTO, empty_bagid_dto_1.VerifyAuditTrailDto, Object]),
    __metadata("design:returntype", Promise)
], EmptyBagStoreDataController.prototype, "checkingOuterBagidExistOrNot", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Post)('verifying-empty-inner-bag-id'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [empty_bagid_dto_1.EmptyBagIdVerifyDTO, empty_bagid_dto_1.VerifyAuditTrailDto, Object]),
    __metadata("design:returntype", Promise)
], EmptyBagStoreDataController.prototype, "verifyingEmptyInnerBagID", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Post)('verifying-outer-bag_id'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [empty_bagid_dto_1.EmptyBagIdVerifyDTO, Object]),
    __metadata("design:returntype", Promise)
], EmptyBagStoreDataController.prototype, "verifyingOuterBagID", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Get)('get-audit-trail'),
    __param(0, (0, common_1.Query)("pageno")),
    __param(1, (0, common_1.Query)("per_page")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], EmptyBagStoreDataController.prototype, "wow_education_coordinator_syllabus_details_audit_trail", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Get)('get-audit-trail-verify'),
    __param(0, (0, common_1.Query)("pageno")),
    __param(1, (0, common_1.Query)("per_page")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], EmptyBagStoreDataController.prototype, "getAuditTrailVerify", null);
__decorate([
    (0, common_1.Get)('get-token'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EmptyBagStoreDataController.prototype, "getToken", null);
EmptyBagStoreDataController = __decorate([
    (0, common_1.Controller)("empty-bag-store-data"),
    __metadata("design:paramtypes", [empty_bag_store_data_service_1.EmptyBagStoreDataService, auth_service_1.AuthService])
], EmptyBagStoreDataController);
exports.EmptyBagStoreDataController = EmptyBagStoreDataController;
//# sourceMappingURL=empty-bag-store-data.controller.js.map