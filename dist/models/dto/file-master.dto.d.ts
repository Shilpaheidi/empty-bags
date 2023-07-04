import { CommonFieldsDto } from './common-fields.dto';
export declare class AddFileMasterDto extends CommonFieldsDto {
    uploaded_created_by_user_id: number;
    uploaded_created_utc_date_time: string;
    is_uploaded_via_other_userapp: boolean;
    is_uploaded_via_customapp: boolean;
    app_id: number;
    mapping_id: string;
    mapping_parent: string;
}
declare const UpdateFileMasterDto_base: import("@nestjs/common").Type<Omit<AddFileMasterDto, "is_uploaded_via_other_userapp" | "is_uploaded_via_customapp" | "app_id" | "mapping_id" | "mapping_parent">>;
export declare class UpdateFileMasterDto extends UpdateFileMasterDto_base {
    cloud_file_id: number;
}
export {};
