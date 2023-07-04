export declare class empty_bag_id {
    collection_bag_id: number;
    is_this_empty_bag_packed_inside_collection_bag: number;
    empty_bag_packed_inside_collection_bag_id: number;
}
export declare class audit_trail {
    id: number;
    entry_date_time: any;
    entry_type: any;
    entry_by_getsterid: any;
}
export declare class EmptyBagIdNewDTO {
    bag_id: number;
    bag_collection_center_id: number;
    empty_bag_packed_inside_bag_id: number;
    empty_bag_packed_by_getster_id: string;
    empty_bag_packing_in_outer_bag_verified_by_getster_id: string;
    audit: audit_trail;
}
export declare class AuditTrailDto {
    bag_id: number;
    entry_type: string;
    entry_date_time: string;
    entry_by_user_id: number;
}
export declare class VerifyAuditTrailDto {
    bag_id: number;
    entry_type: string;
    entry_date_time: string;
    entry_by_user_id: number;
}
export declare class collectingbags3 {
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
    audit_trail: AuditTrailDto;
}
export declare class EmptyBagIdVerifyDTO {
    bag_id: number;
}
export declare class EmptyBagIdNewInsertDTO {
    bag_id: any;
    bag_collection_center_id: any;
}
export declare class EmptyBagIdNewScanDTO {
    bag_id: number;
    bag_collection_center_id: string;
}
