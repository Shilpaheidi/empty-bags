import { AuditTrailTableInterface } from "src/models/interface/common-fields.interface";
import { DateTimeService } from "src/common/services/date-time/date-time.service";
export declare class EmptyBagStoreDataService {
    private datetimeservice;
    constructor(datetimeservice: DateTimeService);
    verifyingOuterBagID(empty_bag_id_new: any, country_code: string, camp_id: number): Promise<any[]>;
    postingEmptyOuterBagIDInsert(empty_bag_id_new: any, audittable: AuditTrailTableInterface, country_code: string, camp_id: number, time_zone_iana_string: string): Promise<string>;
    postingEmptyInnerBagIDInsert(data: any, audittable: AuditTrailTableInterface, country_code: string, camp_id: number, time_zone_iana_string: string): Promise<string>;
    checkingOuterBagidExistOrNot(empty_bag_id_new: any, audittable: AuditTrailTableInterface, country_code: string, camp_id: number, time_zone_iana_string: string): Promise<any>;
    postingEmptyOuterBagID(empty_bag_id_new: any, country_code: string, camp_id: number): Promise<string>;
    postingEmptyInnerBagID(empty_bag_id_new: any, country_code: string, camp_id: number): Promise<string>;
    verifyingEmptyInnerBagID(empty_bag_id_new: any, audittable: AuditTrailTableInterface, country_code: string, camp_id: number, time_zone_iana_string: string): Promise<any[]>;
    deleteRecords(bag_id: any, audittable: AuditTrailTableInterface, country_code: string, camp_id: number, time_zone_iana_string: string): Promise<void>;
    getAuditTrail(pageno: number, per_page: any): Promise<any>;
    getAuditTrailVerify(pageno: number, per_page: any): Promise<any>;
}
