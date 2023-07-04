export declare class CommonFieldsInterface {
    customer_id: number;
    country_code: string;
}
export declare class auditInterfaec {
    id: number;
    entry_date_time: any;
    entry_type: any;
    entry_by_getsterid: number;
}
export interface AuditTrailTableInterface {
    bag_id: number;
    entry_type: string;
    entry_date_time: string;
    entry_by_user_id: number;
}
export interface collectionBags {
    bag_id: number;
    bag_collection_center_id: number;
    collection_bag_location: number;
    is_this_empty_bag_packed_inside_collection_bag: number;
    empty_bag_packed_inside_bag_collection_center_id: number;
    empty_bag_packed_inside_bag_id: number;
    empty_bag_packed_by_getster_id: number;
    empty_bag_packing_in_outer_bag_verified_by_getster_id: number;
    is_filled_with_waste_paper: number;
    filled_bag_content_weight: number;
    bag_at_wow_coordinator_getster_id: number;
    bag_at_wow_cutomer_id: number;
    bag_at_transit_vehicle_no: number;
    is_collection_bag_damaged: number;
    is_collection_bag_lost: number;
    lost_reported_by_getster_id: number;
    audit_trail: AuditTrailTableInterface;
}
