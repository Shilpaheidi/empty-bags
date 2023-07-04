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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmptyBagIdNewScanDTO = exports.EmptyBagIdNewInsertDTO = exports.EmptyBagIdVerifyDTO = exports.collectingbags3 = exports.VerifyAuditTrailDto = exports.AuditTrailDto = exports.EmptyBagIdNewDTO = exports.audit_trail = exports.empty_bag_id = void 0;
const swagger_1 = require("@nestjs/swagger");
class empty_bag_id {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], empty_bag_id.prototype, "collection_bag_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], empty_bag_id.prototype, "is_this_empty_bag_packed_inside_collection_bag", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], empty_bag_id.prototype, "empty_bag_packed_inside_collection_bag_id", void 0);
exports.empty_bag_id = empty_bag_id;
class audit_trail {
}
exports.audit_trail = audit_trail;
class EmptyBagIdNewDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], EmptyBagIdNewDTO.prototype, "bag_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], EmptyBagIdNewDTO.prototype, "bag_collection_center_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], EmptyBagIdNewDTO.prototype, "empty_bag_packed_inside_bag_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], EmptyBagIdNewDTO.prototype, "empty_bag_packed_by_getster_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], EmptyBagIdNewDTO.prototype, "empty_bag_packing_in_outer_bag_verified_by_getster_id", void 0);
exports.EmptyBagIdNewDTO = EmptyBagIdNewDTO;
class AuditTrailDto {
}
exports.AuditTrailDto = AuditTrailDto;
class VerifyAuditTrailDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], VerifyAuditTrailDto.prototype, "entry_by_user_id", void 0);
exports.VerifyAuditTrailDto = VerifyAuditTrailDto;
class collectingbags3 {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], collectingbags3.prototype, "bag_id", void 0);
exports.collectingbags3 = collectingbags3;
class EmptyBagIdVerifyDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], EmptyBagIdVerifyDTO.prototype, "bag_id", void 0);
exports.EmptyBagIdVerifyDTO = EmptyBagIdVerifyDTO;
class EmptyBagIdNewInsertDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Object)
], EmptyBagIdNewInsertDTO.prototype, "bag_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Object)
], EmptyBagIdNewInsertDTO.prototype, "bag_collection_center_id", void 0);
exports.EmptyBagIdNewInsertDTO = EmptyBagIdNewInsertDTO;
class EmptyBagIdNewScanDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], EmptyBagIdNewScanDTO.prototype, "bag_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], EmptyBagIdNewScanDTO.prototype, "bag_collection_center_id", void 0);
exports.EmptyBagIdNewScanDTO = EmptyBagIdNewScanDTO;
//# sourceMappingURL=empty-bagid.dto.js.map