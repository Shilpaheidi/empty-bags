
import { Injectable } from "@nestjs/common";
import { dbConnection } from "src/app.module";
import * as mysql from 'mysql2';
import { DateTime } from 'luxon';
import { AuditTrailTableInterface } from "src/models/interface/common-fields.interface";
import { DateTimeService } from "src/common/services/date-time/date-time.service";



@Injectable()
export class EmptyBagStoreDataService {

  constructor(private datetimeservice: DateTimeService) { }


  async verifyingOuterBagID(empty_bag_id_new,country_code:string, camp_id:number, ) {


    try {

   
      

      const empty_bag_id_inner_bags = await dbConnection.query(`SELECT * FROM manage_camps_collection_centers.3_getsterapp_${country_code}_${camp_id}_camp_center_collection_bags_stock_management
     where empty_bag_packed_inside_bag_id = '${empty_bag_id_new.bag_id}' 
     and is_this_empty_bag_packed_inside_collection_bag = 1 
     and empty_bag_packed_inside_bag_collection_center_id  Is NOT NULL
     and empty_bag_packed_inside_bag_id Is NOT NULL
    
    `);

      const empty_bag_id_inner_bags3 = await dbConnection.query(`SELECT * FROM manage_camps_collection_centers.3_getsterapp_${country_code}_${camp_id}_camp_center_collection_bags_stock_management 
   where bag_id = '${empty_bag_id_new.bag_id}'
   and is_this_empty_bag_packed_inside_collection_bag = 0 
   and empty_bag_packed_inside_bag_collection_center_id  Is  NULL
   and empty_bag_packed_inside_bag_id Is  NULL
  
  `);

      let result: any[] = [];

      if (empty_bag_id_inner_bags.length === 0 && empty_bag_id_inner_bags3.length === 0) {
        result.push('Not found');
        return result;
      } else if (empty_bag_id_inner_bags3.length > 0 && empty_bag_id_inner_bags.length === 0) {
        result.push('This is an Outer bag_id');
        return result;
      } else {
        for (let id of empty_bag_id_inner_bags) {
          let bid = id.bag_id;
          if (bid) {
            result.push(bid);
          }
        }
      }


      return result;
    } catch (error) {

      throw error;
    }
  }
  async postingEmptyOuterBagIDInsert(empty_bag_id_new, audittable: AuditTrailTableInterface,country_code:string, camp_id:number, time_zone_iana_string: string) {

    try {
    
      const datetime = this.datetimeservice.getDateTime(time_zone_iana_string)
      const empty_bag_id = await dbConnection.query(`SELECT * FROM manage_camps_collection_centers.3_getsterapp_${country_code}_${camp_id}_camp_center_collection_bags_stock_management
   where bag_id = '${empty_bag_id_new.bag_id}' and bag_collection_center_id = '${empty_bag_id_new.bag_collection_center_id}'
   and is_this_empty_bag_packed_inside_collection_bag = 0 
   and empty_bag_packed_inside_bag_collection_center_id  Is NULL
   and empty_bag_packed_inside_bag_id Is NULL
  
  `)

      const empty_bag_id_check_bag_id = await dbConnection.query(`SELECT * FROM manage_camps_collection_centers.3_getsterapp_${country_code}_${camp_id}_camp_center_collection_bags_stock_management
  where bag_id = '${empty_bag_id_new.bag_id}' 
  and is_this_empty_bag_packed_inside_collection_bag = 0 
  and empty_bag_packed_inside_bag_collection_center_id  Is NULL
  and empty_bag_packed_inside_bag_id Is NULL
 
 `)

      const empty_bag_id_check_bag_collection_center_id = await dbConnection.query(`SELECT * FROM manage_camps_collection_centers.3_getsterapp_${country_code}_${camp_id}_camp_center_collection_bags_stock_management
 where bag_id != '${empty_bag_id_new.bag_id}' 
 and is_this_empty_bag_packed_inside_collection_bag = 0 
 and empty_bag_packed_inside_bag_collection_center_id  Is NULL
 and empty_bag_packed_inside_bag_id Is NULL

`)

      const empty_bag_id_inner_bag_id = await dbConnection.query(`SELECT * FROM manage_camps_collection_centers.3_getsterapp_${country_code}_${camp_id}_camp_center_collection_bags_stock_management
where bag_id = '${empty_bag_id_new.bag_id}' and bag_collection_center_id = '${empty_bag_id_new.bag_collection_center_id}'
and is_this_empty_bag_packed_inside_collection_bag = 1 
and empty_bag_packed_inside_bag_collection_center_id  Is NOT NULL
and empty_bag_packed_inside_bag_id Is NOT NULL

`)

      const empty_bag_id_inner_bag_id_not_centerid = await dbConnection.query(`SELECT * FROM manage_camps_collection_centers.3_getsterapp_${country_code}_${camp_id}_camp_center_collection_bags_stock_management
where bag_id = '${empty_bag_id_new.bag_id}' 
and is_this_empty_bag_packed_inside_collection_bag = 1 
and empty_bag_packed_inside_bag_collection_center_id  Is NOT NULL
and empty_bag_packed_inside_bag_id Is NOT NULL

`)

      const empty_bag_id_inner_bag_id_centerid = await dbConnection.query(`SELECT * FROM manage_camps_collection_centers.3_getsterapp_${country_code}_${camp_id}_camp_center_collection_bags_stock_management
where bag_id != '${empty_bag_id_new.bag_id}' 
and is_this_empty_bag_packed_inside_collection_bag = 1 
and empty_bag_packed_inside_bag_collection_center_id  Is NOT NULL
and empty_bag_packed_inside_bag_id Is NOT NULL

`)




      if (empty_bag_id.length == 1 || empty_bag_id_check_bag_id.length == 1) {

        let id = "This outer bag id is already exist"
        return id;
      }
      if (empty_bag_id_check_bag_collection_center_id.length == 1) {

        let id = "This outer bag id is already exist"
        return id;
      }

      if (empty_bag_id_inner_bag_id.length == 1 || empty_bag_id_inner_bag_id_not_centerid.length == 1 || empty_bag_id_inner_bag_id_centerid.length == 1) {

        let id = "This inner bag id is already exist"
        return id;
      }


      if (empty_bag_id.length == 0 || empty_bag_id_check_bag_id.length == 0 || empty_bag_id_check_bag_collection_center_id.length == 0) {


        const inserting_bag_id = await dbConnection.query(`insert into manage_camps_collection_centers.3_getsterapp_${country_code}_${camp_id}_camp_center_collection_bags_stock_management (
        bag_collection_center_id,
        bag_id,is_this_empty_bag_packed_inside_collection_bag,
        empty_bag_packed_inside_bag_collection_center_id,
        empty_bag_packed_inside_bag_id,
        empty_bag_packed_by_getster_id,
        empty_bag_packing_in_outer_bag_verified_by_getster_id ) values (${mysql.escape(empty_bag_id_new.bag_collection_center_id)},
        ${mysql.escape(empty_bag_id_new.bag_id)},
        ${mysql.escape(empty_bag_id_new.is_this_empty_bag_packed_inside_collection_bag = 0)},
        ${mysql.escape(empty_bag_id_new.empty_bag_packed_inside_bag_collection_center_id = null)},
        ${mysql.escape(empty_bag_id_new.empty_bag_packed_inside_bag_id = null)},
        ${mysql.escape(empty_bag_id_new.empty_bag_packed_by_getster_id)},
        ${mysql.escape(empty_bag_id_new.empty_bag_packing_in_outer_bag_verified_by_getster_id)})`)



        if (inserting_bag_id) {




          // const TimeZoneIanaString = 'Asia/Kolkata';
          // const entry_date_time: any = DateTime.local({
          //   zone: TimeZoneIanaString,
          // }).toFormat('yyyy-MM-dd TT');




          // const audit_trail = `in_1_edu_customer_db.audit_trail_packing_empty_bags`;






          // await dbConnection.query(
          //   `INSERT IGNORE INTO ${audit_trail} (entry_type,entry_date_time,entry_by_user_id) VALUES (${mysql.escape((audittable.entry_type = 'Inserted Outer Bagid'))} ,
          //     ${mysql.escape(datetime)},
          //       ${mysql.escape((audittable.entry_by_user_id))}
          //      );`
          // );

          let id = 'Entered outer bag id is inserted'
          return id
        }



      }


      if (empty_bag_id_inner_bag_id.length == 0 || empty_bag_id_inner_bag_id_not_centerid.length == 0 || empty_bag_id_inner_bag_id_centerid.length == 0) {


        const inserting_bag_id = await dbConnection.query(`insert into manage_camps_collection_centers.3_getsterapp_${country_code}_${camp_id}_camp_center_collection_bags_stock_management (
        bag_collection_center_id,
        bag_id,is_this_empty_bag_packed_inside_collection_bag,
        empty_bag_packed_inside_bag_collection_center_id,
        empty_bag_packed_inside_bag_id,
        empty_bag_packed_by_getster_id,
        empty_bag_packing_in_outer_bag_verified_by_getster_id ) values (${mysql.escape(empty_bag_id_new.bag_collection_center_id)},
        ${mysql.escape(empty_bag_id_new.bag_id)},
        ${mysql.escape(empty_bag_id_new.is_this_empty_bag_packed_inside_collection_bag = 0)},
        ${mysql.escape(empty_bag_id_new.empty_bag_packed_inside_bag_collection_center_id = null)},
        ${mysql.escape(empty_bag_id_new.empty_bag_packed_inside_bag_id = null)},
        ${mysql.escape(empty_bag_id_new.empty_bag_packed_by_getster_id)},
        ${mysql.escape(empty_bag_id_new.empty_bag_packing_in_outer_bag_verified_by_getster_id)})`)



        if (inserting_bag_id) {



  

          // const TimeZoneIanaString = 'Asia/Kolkata';
          // const entry_date_time: any = DateTime.local({
          //   zone: TimeZoneIanaString,
          // }).toFormat('yyyy-MM-dd TT');




          // const audit_trail = `in_1_edu_customer_db.audit_trail_packing_empty_bags`;






          // await dbConnection.query(
          //   `INSERT IGNORE INTO ${audit_trail} (entry_type,entry_date_time,entry_by_user_id) VALUES (${mysql.escape((audittable.entry_type = 'Inserted Outer Bagid'))} ,
          //     ${mysql.escape(datetime)},
          //       ${mysql.escape((audittable.entry_by_user_id))}
          //      );`
          // );

          let id = 'Entered outer bag id is inserted'
          return id
        }



      }
    } catch (error) {

      throw error;

    }

  }
  async postingEmptyInnerBagIDInsert(data: any, audittable: AuditTrailTableInterface,country_code:string, camp_id:number,  time_zone_iana_string: string) {

    try {
   
      const datetime = this.datetimeservice.getDateTime(time_zone_iana_string)

      const empty_bag_id = await dbConnection.query(`SELECT * FROM manage_camps_collection_centers.3_getsterapp_${country_code}_${camp_id}_camp_center_collection_bags_stock_management
      where bag_id = '${data.bag_id}' and bag_collection_center_id = '${data.bag_collection_center_id}'
      and is_this_empty_bag_packed_inside_collection_bag = 0 
      and empty_bag_packed_inside_bag_collection_center_id  Is NULL
      and empty_bag_packed_inside_bag_id Is NULL
     
     `)

      const empty_bag_id_check_bag_id = await dbConnection.query(`SELECT * FROM manage_camps_collection_centers.3_getsterapp_${country_code}_${camp_id}_camp_center_collection_bags_stock_management
     where bag_id = '${data.bag_id}' 
     and is_this_empty_bag_packed_inside_collection_bag = 0 
     and empty_bag_packed_inside_bag_collection_center_id  Is NULL
     and empty_bag_packed_inside_bag_id Is NULL
    
    `)

      const empty_bag_id_check_bag_collection_center_id = await dbConnection.query(`SELECT * FROM manage_camps_collection_centers.3_getsterapp_${country_code}_${camp_id}_camp_center_collection_bags_stock_management
    where bag_id != '${data.bag_id}' 
    and is_this_empty_bag_packed_inside_collection_bag = 0 
    and empty_bag_packed_inside_bag_collection_center_id  Is NULL
    and empty_bag_packed_inside_bag_id Is NULL
   
   `)

      const empty_bag_id_inner_bag_id = await dbConnection.query(`SELECT * FROM manage_camps_collection_centers.3_getsterapp_${country_code}_${camp_id}_camp_center_collection_bags_stock_management
   where bag_id = '${data.bag_id}' and bag_collection_center_id = '${data.bag_collection_center_id}'
   and is_this_empty_bag_packed_inside_collection_bag = 1 
   and empty_bag_packed_inside_bag_collection_center_id  Is NOT NULL
   and empty_bag_packed_inside_bag_id Is NOT NULL
   
   `)

      const empty_bag_id_inner_bag_id_not_centerid = await dbConnection.query(`SELECT * FROM manage_camps_collection_centers.3_getsterapp_${country_code}_${camp_id}_camp_center_collection_bags_stock_management
   where bag_id = '${data.bag_id}' 
   and is_this_empty_bag_packed_inside_collection_bag = 1 
   and empty_bag_packed_inside_bag_collection_center_id  Is NOT NULL
   and empty_bag_packed_inside_bag_id Is NOT NULL
   
   `)

      const empty_bag_id_inner_bag_id_centerid = await dbConnection.query(`SELECT * FROM manage_camps_collection_centers.3_getsterapp_${country_code}_${camp_id}_camp_center_collection_bags_stock_management
   where bag_id != '${data.bag_id}' 
   and is_this_empty_bag_packed_inside_collection_bag = 1 
   and empty_bag_packed_inside_bag_collection_center_id  Is NOT NULL
   and empty_bag_packed_inside_bag_id Is NOT NULL
   
   `)


      //         inner bag id ------------

      if (empty_bag_id.length == 1 || empty_bag_id_check_bag_id.length == 1) {

        let id = "This outer bag id is already exist"
        return id;
      }
      if (empty_bag_id_check_bag_collection_center_id.length == 1) {

        let id = "This outer bag id is already exist"
        return id;
      }

      if (empty_bag_id_inner_bag_id.length == 1 || empty_bag_id_inner_bag_id_not_centerid.length == 1 || empty_bag_id_inner_bag_id_centerid.length == 1) {

        let id = "This inner bag id is already exist"
        return id;
      }




      if (empty_bag_id.length == 0 || empty_bag_id_check_bag_id.length == 0 || empty_bag_id_check_bag_collection_center_id.length == 0) {

        const inserting_bag_id = await dbConnection.query(`insert into manage_camps_collection_centers.3_getsterapp_${country_code}_${camp_id}_camp_center_collection_bags_stock_management(
            bag_collection_center_id,
            bag_id,is_this_empty_bag_packed_inside_collection_bag,
            empty_bag_packed_inside_bag_collection_center_id,
            empty_bag_packed_inside_bag_id,
            empty_bag_packed_by_getster_id,
            empty_bag_packing_in_outer_bag_verified_by_getster_id ) values (${mysql.escape(data.bag_collection_center_id)},
            ${mysql.escape(data.bag_id)},${mysql.escape(data.is_this_empty_bag_packed_inside_collection_bag = 1)},
            ${mysql.escape(data.empty_bag_packed_inside_bag_collection_center_id = (data.bag_collection_center_id))},
            ${mysql.escape(data.empty_bag_packed_inside_bag_id)},
            ${mysql.escape(data.empty_bag_packed_by_getster_id)},
            ${mysql.escape(data.empty_bag_packing_in_outer_bag_verified_by_getster_id)})`)




        if (inserting_bag_id) {




          // const audit_trail = `in_1_edu_customer_db.audit_trail_packing_empty_bags`;






          // await dbConnection.query(
          //   `INSERT IGNORE INTO ${audit_trail} (entry_type,entry_date_time,entry_by_user_id) VALUES (${mysql.escape((audittable.entry_type = 'Inserted Inner Bagid'))} ,
          //     ${mysql.escape(datetime)},
          //       ${mysql.escape((audittable.entry_by_user_id))}
          //      );`,
          // );

          let id = "Inserted Successfully"
          return id;
        }

      }


      if (empty_bag_id_inner_bag_id.length == 0 || empty_bag_id_inner_bag_id_not_centerid.length == 0 || empty_bag_id_inner_bag_id_centerid.length == 0) {

        const inserting_bag_id = await dbConnection.query(`insert into manage_camps_collection_centers.3_getsterapp_${country_code}_${camp_id}_camp_center_collection_bags_stock_management(
            bag_collection_center_id,
            bag_id,is_this_empty_bag_packed_inside_collection_bag,
            empty_bag_packed_inside_bag_collection_center_id,
            empty_bag_packed_inside_bag_id,
            empty_bag_packed_by_getster_id,
            empty_bag_packing_in_outer_bag_verified_by_getster_id ) values (${mysql.escape(data.bag_collection_center_id)},
            ${mysql.escape(data.bag_id)},${mysql.escape(data.is_this_empty_bag_packed_inside_collection_bag = 1)},
            ${mysql.escape(data.empty_bag_packed_inside_bag_collection_center_id = (data.bag_collection_center_id))},
            ${mysql.escape(data.empty_bag_packed_inside_bag_id)},
            ${mysql.escape(data.empty_bag_packed_by_getster_id)},
            ${mysql.escape(data.empty_bag_packing_in_outer_bag_verified_by_getster_id)})`)




        if (inserting_bag_id) {




          // const audit_trail = `in_1_edu_customer_db.audit_trail_packing_empty_bags`;






          // await dbConnection.query(
          //   `INSERT IGNORE INTO ${audit_trail} (entry_type,entry_date_time,entry_by_user_id) VALUES (${mysql.escape((audittable.entry_type = 'Inserted Inner Bagid'))} ,
          //     ${mysql.escape(datetime)},
          //       ${mysql.escape((audittable.entry_by_user_id))}
          //      );`,
          // );

          let id = "Inserted Successfully"
          return id;
        }

      }




    } catch (error) {

      throw error;
    } finally {

    }



  }
  async checkingOuterBagidExistOrNot(empty_bag_id_new, audittable: AuditTrailTableInterface,country_code:string, camp_id:number,  time_zone_iana_string: string) {

    try {
     
      const datetime = this.datetimeservice.getDateTime(time_zone_iana_string)

      const empty_bag_id: any = await dbConnection.query(`SELECT * FROM manage_camps_collection_centers.3_getsterapp_${country_code}_${camp_id}_camp_center_collection_bags_stock_management
       where bag_id = '${empty_bag_id_new.bag_id}' 
       and is_this_empty_bag_packed_inside_collection_bag = 0 
       and empty_bag_packed_inside_bag_collection_center_id  Is NULL
       and empty_bag_packed_inside_bag_id Is NULL
      
      `)
      let bagid
      let id = 'Outer id does not exist'

      for (let i of empty_bag_id) {
        bagid = i.bag_id;

        if (bagid) {
          // const audit_trail = `in_1_edu_customer_db.audit_trail_for_verifying_packed_bags`;

          // await dbConnection.query(
          //   `INSERT IGNORE INTO ${audit_trail} (entry_type,entry_date_time,entry_by_user_id) VALUES (${mysql.escape((audittable.entry_type = 'Verified Outer Bagid'))} ,
          //             ${mysql.escape(datetime)},
          //               ${mysql.escape((audittable.entry_by_user_id))}
          //             );`,
          // );

          return bagid;
        }

      }

      if (empty_bag_id.length == 0) {

        return id
      }
    } catch (error) {

      throw error;
    }

  }
  async postingEmptyOuterBagID(empty_bag_id_new,country_code:string, camp_id:number, ) {

    try {
     


      const empty_bag_id = await dbConnection.query(`SELECT * FROM manage_camps_collection_centers.3_getsterapp_${country_code}_${camp_id}_camp_center_collection_bags_stock_management
      where bag_id = '${empty_bag_id_new.bag_id}' and bag_collection_center_id = '${empty_bag_id_new.bag_collection_center_id}'
      and is_this_empty_bag_packed_inside_collection_bag = 0 
      and empty_bag_packed_inside_bag_collection_center_id  Is NULL
      and empty_bag_packed_inside_bag_id Is NULL
     
     `)

      const empty_bag_id_check_bag_id = await dbConnection.query(`SELECT * FROM manage_camps_collection_centers.3_getsterapp_${country_code}_${camp_id}_camp_center_collection_bags_stock_management
     where bag_id = '${empty_bag_id_new.bag_id}' 
     and is_this_empty_bag_packed_inside_collection_bag = 0 
     and empty_bag_packed_inside_bag_collection_center_id  Is NULL
     and empty_bag_packed_inside_bag_id Is NULL
    
    `)

      const empty_bag_id_check_bag_collection_center_id = await dbConnection.query(`SELECT * FROM manage_camps_collection_centers.3_getsterapp_${country_code}_${camp_id}_camp_center_collection_bags_stock_management
    where bag_id != '${empty_bag_id_new.bag_id}' 
    and is_this_empty_bag_packed_inside_collection_bag = 0 
    and empty_bag_packed_inside_bag_collection_center_id  Is NULL
    and empty_bag_packed_inside_bag_id Is NULL
   
   `)

      const empty_bag_id_inner_bag_id = await dbConnection.query(`SELECT * FROM manage_camps_collection_centers.3_getsterapp_${country_code}_${camp_id}_camp_center_collection_bags_stock_management
   where bag_id = '${empty_bag_id_new.bag_id}' and bag_collection_center_id = '${empty_bag_id_new.bag_collection_center_id}'
   and is_this_empty_bag_packed_inside_collection_bag = 1 
   and empty_bag_packed_inside_bag_collection_center_id  Is NOT NULL
   and empty_bag_packed_inside_bag_id Is NOT NULL
   
   `)

      const empty_bag_id_inner_bag_id_not_centerid = await dbConnection.query(`SELECT * FROM manage_camps_collection_centers.3_getsterapp_${country_code}_${camp_id}_camp_center_collection_bags_stock_management
   where bag_id = '${empty_bag_id_new.bag_id}' 
   and is_this_empty_bag_packed_inside_collection_bag = 1 
   and empty_bag_packed_inside_bag_collection_center_id  Is NOT NULL
   and empty_bag_packed_inside_bag_id Is NOT NULL
   
   `)

      const empty_bag_id_inner_bag_id_centerid = await dbConnection.query(`SELECT * FROM manage_camps_collection_centers.3_getsterapp_${country_code}_${camp_id}_camp_center_collection_bags_stock_management
   where bag_id != '${empty_bag_id_new.bag_id}' 
   and is_this_empty_bag_packed_inside_collection_bag = 1 
   and empty_bag_packed_inside_bag_collection_center_id  Is NOT NULL
   and empty_bag_packed_inside_bag_id Is NOT NULL
   
   `)


      //         inner bag id ------------

      if (empty_bag_id.length == 1 || empty_bag_id_check_bag_id.length == 1) {

        let id = "This outer bag id is already exist"
        return id;
      }
      if (empty_bag_id_check_bag_collection_center_id.length == 1) {

        let id = "This outer bag id is already exist"
        return id;
      }

      if (empty_bag_id_inner_bag_id.length == 1 || empty_bag_id_inner_bag_id_not_centerid.length == 1 || empty_bag_id_inner_bag_id_centerid.length == 1) {

        let id = "This inner bag id is already exist"
        return id;
      }



      if (empty_bag_id.length == 0 || empty_bag_id_check_bag_id.length == 0 || empty_bag_id_check_bag_collection_center_id.length == 0) {


        let id = "Inserted Successfully"
        return id;


      }


      if (empty_bag_id_inner_bag_id.length == 0 || empty_bag_id_inner_bag_id_not_centerid.length == 0 || empty_bag_id_inner_bag_id_centerid.length == 0) {








        let id = "Inserted Successfully"
        return id;


      }






    } catch (error) {

      throw error;
    }

  }
  async postingEmptyInnerBagID(empty_bag_id_new,country_code:string, camp_id:number, ) {

    try {

    

      const empty_bag_id = await dbConnection.query(`SELECT * FROM manage_camps_collection_centers.3_getsterapp_${country_code}_${camp_id}_camp_center_collection_bags_stock_management
      where bag_id = '${empty_bag_id_new.bag_id}' and bag_collection_center_id = '${empty_bag_id_new.bag_collection_center_id}'
      and is_this_empty_bag_packed_inside_collection_bag = 0 
      and empty_bag_packed_inside_bag_collection_center_id  Is NULL
      and empty_bag_packed_inside_bag_id Is NULL
     
     `)

      const empty_bag_id_check_bag_id = await dbConnection.query(`SELECT * FROM manage_camps_collection_centers.3_getsterapp_${country_code}_${camp_id}_camp_center_collection_bags_stock_management
     where bag_id = '${empty_bag_id_new.bag_id}' 
     and is_this_empty_bag_packed_inside_collection_bag = 0 
     and empty_bag_packed_inside_bag_collection_center_id  Is NULL
     and empty_bag_packed_inside_bag_id Is NULL
    
    `)

      const empty_bag_id_check_bag_collection_center_id = await dbConnection.query(`SELECT * FROM manage_camps_collection_centers.3_getsterapp_${country_code}_${camp_id}_camp_center_collection_bags_stock_management
    where bag_id != '${empty_bag_id_new.bag_id}' 
    and is_this_empty_bag_packed_inside_collection_bag = 0 
    and empty_bag_packed_inside_bag_collection_center_id  Is NULL
    and empty_bag_packed_inside_bag_id Is NULL
   
   `)

      const empty_bag_id_inner_bag_id = await dbConnection.query(`SELECT * FROM manage_camps_collection_centers.3_getsterapp_${country_code}_${camp_id}_camp_center_collection_bags_stock_management
   where bag_id = '${empty_bag_id_new.bag_id}' and bag_collection_center_id = '${empty_bag_id_new.bag_collection_center_id}'
   and is_this_empty_bag_packed_inside_collection_bag = 1 
   and empty_bag_packed_inside_bag_collection_center_id  Is NOT NULL
   and empty_bag_packed_inside_bag_id Is NOT NULL
   
   `)

      const empty_bag_id_inner_bag_id_not_centerid = await dbConnection.query(`SELECT * FROM manage_camps_collection_centers.3_getsterapp_${country_code}_${camp_id}_camp_center_collection_bags_stock_management
   where bag_id = '${empty_bag_id_new.bag_id}' 
   and is_this_empty_bag_packed_inside_collection_bag = 1 
   and empty_bag_packed_inside_bag_collection_center_id  Is NOT NULL
   and empty_bag_packed_inside_bag_id Is NOT NULL
   
   `)

      const empty_bag_id_inner_bag_id_centerid = await dbConnection.query(`SELECT * FROM manage_camps_collection_centers.3_getsterapp_${country_code}_${camp_id}_camp_center_collection_bags_stock_management
   where bag_id != '${empty_bag_id_new.bag_id}' 
   and is_this_empty_bag_packed_inside_collection_bag = 1 
   and empty_bag_packed_inside_bag_collection_center_id  Is NOT NULL
   and empty_bag_packed_inside_bag_id Is NOT NULL
   
   `)




      if (empty_bag_id.length == 1 || empty_bag_id_check_bag_id.length == 1) {

        let id = "This outer bag id is already exist"
        return id;
      }
      if (empty_bag_id_check_bag_collection_center_id.length == 1) {

        let id = "This outer bag id is already exist"
        return id;
      }

      if (empty_bag_id_inner_bag_id.length == 1 || empty_bag_id_inner_bag_id_not_centerid.length == 1 || empty_bag_id_inner_bag_id_centerid.length == 1) {

        let id = "This inner bag id is already exist"
        return id;
      }



      if (empty_bag_id.length == 0 || empty_bag_id_check_bag_id.length == 0 || empty_bag_id_check_bag_collection_center_id.length == 0) {


        let id = "Inserted Successfully"
        return id;


      }


      if (empty_bag_id_inner_bag_id.length == 0 || empty_bag_id_inner_bag_id_not_centerid.length == 0 || empty_bag_id_inner_bag_id_centerid.length == 0) {








        let id = "Inserted Successfully"
        return id;


      }





    } catch (error) {

      throw error;
    }



  }
  async verifyingEmptyInnerBagID(empty_bag_id_new, audittable: AuditTrailTableInterface,country_code:string, camp_id:number,  time_zone_iana_string: string) {


    try {


      const datetime = this.datetimeservice.getDateTime(time_zone_iana_string)
      const empty_bag_id_inner_bags = await dbConnection.query(`SELECT * FROM manage_camps_collection_centers.3_getsterapp_${country_code}_${camp_id}_camp_center_collection_bags_stock_management
                     where bag_id = '${empty_bag_id_new.bag_id}' 
                  
                    
                    `)

      const empty_bag_id_inner_bags1 = await dbConnection.query(`SELECT * FROM manage_camps_collection_centers.3_getsterapp_${country_code}_${camp_id}_camp_center_collection_bags_stock_management 
                    where bag_id != '${empty_bag_id_new.bag_id}' 
                  
                   
                   `)

      let result: any[] = []




      for (let id of empty_bag_id_inner_bags) {

        let bid = id.empty_bag_packed_inside_bag_id



        if (bid) {
          // const audit_trail = `in_1_edu_customer_db.audit_trail_for_verifying_packed_bags`;






          // await dbConnection.query(
          //   `INSERT IGNORE INTO ${audit_trail} (entry_type,entry_date_time,entry_by_user_id) VALUES (${mysql.escape((audittable.entry_type = 'Inner bagid verified'))} ,
          //                 ${mysql.escape(datetime)},
          //                   ${mysql.escape((audittable.entry_by_user_id))}
          //                );`
          // );

          result.push(bid)
        }


        if (bid == null) {
          let bid = 'Not found'



          if (bid) {

            result.push(bid)
          }
        }

      }

      return result;
    } catch (error) {

      throw error;
    }
  }
  async deleteRecords(bag_id, audittable: AuditTrailTableInterface,country_code:string, camp_id:number,  time_zone_iana_string: string) {


    try {


  
      
      const deleting_record = await dbConnection.query(
        `DELETE FROM manage_camps_collection_centers.3_getsterapp_${country_code}_${camp_id}_camp_center_collection_bags_stock_management WHERE bag_id = ${bag_id}`,
      );
      const datetime = this.datetimeservice.getDateTime(time_zone_iana_string)
      if (deleting_record) {
        // const audit_trail = `in_1_edu_customer_db.audit_trail_for_verifying_packed_bags`;
        // await dbConnection.query(
        //   `INSERT IGNORE INTO ${audit_trail} (entry_type,entry_date_time,entry_by_user_id) VALUES (${mysql.escape((audittable.entry_type = 'deleted bagid'))} ,
        //               ${mysql.escape(datetime)},
        //               ${mysql.escape((audittable.entry_by_user_id))});`,
        // );
      }


    } catch (error) {

      throw error;
    }
  }


 
  async getAuditTrail(pageno: number, per_page: any): Promise<any> {

    const db_name = "in_1_edu_customer_db";
    try {

      let offset = pageno * per_page;

      const table_row = await dbConnection.query(`SELECT COUNT(*) AS row_count FROM ${db_name}.audit_trail_packing_empty_bags`);

      let query = `SELECT CONCAT(in_1_edu_customer_db.user_profile.first_name, ' ', in_1_edu_customer_db.user_profile.last_name) AS user_name, in_1_edu_customer_db.audit_trail_packing_empty_bags.entry_by_user_id, entry_type, entry_date_time FROM in_1_edu_customer_db.audit_trail_packing_empty_bags  JOIN in_1_edu_customer_db.user_profile ON user_profile.user_id = audit_trail_packing_empty_bags.entry_by_user_id where  user_id  >  0 * 5`;

      if (per_page && per_page.charAt(0).toUpperCase() + per_page.slice(1) !== "All") {
        query += ` LIMIT ${offset}, ${per_page}`;
      }

      const getster_ids = await dbConnection.query(query);

      const getResult = {
        count: table_row[0].row_count,
        getster_ids: getster_ids,
      };
      return getResult;
    } catch (error) {

      throw error;
    }
  }




  async getAuditTrailVerify(pageno: number, per_page: any): Promise<any> {
    const db_name = "in_1_edu_customer_db";
    const connection = dbConnection; // Replace queryRunner with connection
    try {
      let offset = pageno * per_page;
  
      const [table_row] = await connection.query(
        `SELECT COUNT(*) AS row_count FROM ${db_name}.audit_trail_for_verifying_packed_bags`
      );
  
      let query = `SELECT CONCAT(in_1_edu_customer_db.user_profile.first_name, ' ', in_1_edu_customer_db.user_profile.last_name) AS user_name, in_1_edu_customer_db.audit_trail_for_verifying_packed_bags.entry_by_user_id, entry_type, entry_date_time FROM in_1_edu_customer_db.audit_trail_for_verifying_packed_bags JOIN in_1_edu_customer_db.user_profile ON user_profile.user_id = audit_trail_for_verifying_packed_bags.entry_by_user_id where  user_id  >  0 * 5`;
  
      if (per_page && per_page.charAt(0).toUpperCase() + per_page.slice(1) !== "All") {
        query += ` LIMIT ${offset}, ${per_page}`;
      }
  
      const getster_ids = await connection.query(query);
  
      const getResult = {
        count: table_row.row_count,
        getster_ids:getster_ids,
      };
  
      return getResult;
    } catch (error) {
      throw error;
    }
  }

  
  
}









































































































































































