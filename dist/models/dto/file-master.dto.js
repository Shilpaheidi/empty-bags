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
exports.UpdateFileMasterDto = exports.AddFileMasterDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const common_fields_dto_1 = require("./common-fields.dto");
class AddFileMasterDto extends common_fields_dto_1.CommonFieldsDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ default: 1 }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], AddFileMasterDto.prototype, "uploaded_created_by_user_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ default: '2022-09-08T08:33:40.714Z' }),
    __metadata("design:type", String)
], AddFileMasterDto.prototype, "uploaded_created_utc_date_time", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ default: false, required: false }),
    __metadata("design:type", Boolean)
], AddFileMasterDto.prototype, "is_uploaded_via_other_userapp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ default: false, required: false }),
    __metadata("design:type", Boolean)
], AddFileMasterDto.prototype, "is_uploaded_via_customapp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ default: 5 }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], AddFileMasterDto.prototype, "app_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ default: '123d-234d-5678-23dd' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AddFileMasterDto.prototype, "mapping_id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ default: 'root' }),
    __metadata("design:type", String)
], AddFileMasterDto.prototype, "mapping_parent", void 0);
exports.AddFileMasterDto = AddFileMasterDto;
class UpdateFileMasterDto extends (0, swagger_1.OmitType)(AddFileMasterDto, [
    'app_id',
    'is_uploaded_via_other_userapp',
    'is_uploaded_via_customapp',
    'mapping_parent',
    'mapping_id',
]) {
}
__decorate([
    (0, swagger_1.ApiProperty)({ default: 1 }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], UpdateFileMasterDto.prototype, "cloud_file_id", void 0);
exports.UpdateFileMasterDto = UpdateFileMasterDto;
//# sourceMappingURL=file-master.dto.js.map