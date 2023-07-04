import { ApiProperty } from "@nestjs/swagger";
import { DateTime } from "luxon";

export class empty_bag_id{ //EmptyBagIdDto

    @ApiProperty()
    collection_bag_id:number

    @ApiProperty()
    is_this_empty_bag_packed_inside_collection_bag:number
    
    @ApiProperty()
    empty_bag_packed_inside_collection_bag_id:number

}
export class audit_trail{

    // @ApiProperty()
    id:number
    entry_date_time:any
    entry_type:any
    entry_by_getsterid:any
}



export class EmptyBagIdNewDTO{
 
    @ApiProperty()
    bag_id:number

    @ApiProperty()
    bag_collection_center_id:number

    @ApiProperty()
    empty_bag_packed_inside_bag_id:number

    @ApiProperty()
    empty_bag_packed_by_getster_id:string


    @ApiProperty()
    empty_bag_packing_in_outer_bag_verified_by_getster_id:string
    
    audit:audit_trail

 

}

export class AuditTrailDto {
    // @ApiProperty()
    bag_id: number;
  
    // @ApiProperty()
    entry_type: string;
  
    // @ApiProperty()
    entry_date_time: string;
  
    entry_by_user_id:number;
 
  }


  export class VerifyAuditTrailDto {
    // @ApiProperty()
    bag_id: number;
  
    // @ApiProperty()
    entry_type: string;
  
    // @ApiProperty()
    entry_date_time: string;
  
    @ApiProperty()
    entry_by_user_id:number;
 
  }

export class collectingbags3 {
    @ApiProperty()
    bag_id: number;
    // @ApiProperty()
    bag_collection_center_id: number;
    // @ApiProperty()
  
    // @ApiProperty()
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
    // @ApiProperty()
    audit_trail: AuditTrailDto;
  }


export class EmptyBagIdVerifyDTO{

    @ApiProperty()
    bag_id:number  

    // @ApiProperty()
    // bag_collection_center_id:number

    

    // @ApiProperty()
    // is_this_empty_bag_packed_inside_collection_bag:number
    
    // @ApiProperty()
    // empty_bag_packed_inside_bag_id:number

}

export class EmptyBagIdNewInsertDTO{

    @ApiProperty()
    bag_id:any

    
    @ApiProperty()
    bag_collection_center_id:any

    // @ApiProperty()
    // is_this_empty_bag_packed_inside_collection_bag:number
    
    // @ApiProperty()
    // empty_bag_packed_inside_bag_id:number

}

export class EmptyBagIdNewScanDTO{

    @ApiProperty()
    bag_id:number

    @ApiProperty()
    bag_collection_center_id:string
  
   

}


    

    
 
