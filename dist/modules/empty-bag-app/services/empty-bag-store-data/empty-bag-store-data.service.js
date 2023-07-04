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
exports.EmptyBagStoreDataService = void 0;
const common_1 = require("@nestjs/common");
const app_module_1 = require("../../../../app.module");
const mysql = require("mysql2");
const date_time_service_1 = require("../../../../common/services/date-time/date-time.service");
let EmptyBagStoreDataService = class EmptyBagStoreDataService {
    constructor(datetimeservice) {
        this.datetimeservice = datetimeservice;
    }
    async verifyingOuterBagID(empty_bag_id_new, country_code, camp_id) {
        try {
            const empty_bag_id_inner_bags = await app_module_1.dbConnection.query(`SELECT * FROM manage_camps_collection_centers.3_getsterapp_${country_code}_${camp_id}_camp_center_collection_bags_stock_management
     where empty_bag_packed_inside_bag_id = '${empty_bag_id_new.bag_id}' 
     and is_this_empty_bag_packed_inside_collection_bag = 1 
     and empty_bag_packed_inside_bag_collection_center_id  Is NOT NULL
     and empty_bag_packed_inside_bag_id Is NOT NULL
    
    `);
            const empty_bag_id_inner_bags3 = await app_module_1.dbConnection.query(`SELECT * FROM manage_camps_collection_centers.3_getsterapp_${country_code}_${camp_id}_camp_center_collection_bags_stock_management 
   where bag_id = '${empty_bag_id_new.bag_id}'
   and is_this_empty_bag_packed_inside_collection_bag = 0 
   and empty_bag_packed_inside_bag_collection_center_id  Is  NULL
   and empty_bag_packed_inside_bag_id Is  NULL
  
  `);
            let result = [];
            if (empty_bag_id_inner_bags.length === 0 && empty_bag_id_inner_bags3.length === 0) {
                result.push('Not found');
                return result;
            }
            else if (empty_bag_id_inner_bags3.length > 0 && empty_bag_id_inner_bags.length === 0) {
                result.push('This is an Outer bag_id');
                return result;
            }
            else {
                for (let id of empty_bag_id_inner_bags) {
                    let bid = id.bag_id;
                    if (bid) {
                        result.push(bid);
                    }
                }
            }
            return result;
        }
        catch (error) {
            throw error;
        }
    }
    async postingEmptyOuterBagIDInsert(empty_bag_id_new, audittable, country_code, camp_id, time_zone_iana_string) {
        try {
            const datetime = this.datetimeservice.getDateTime(time_zone_iana_string);
            const empty_bag_id = await app_module_1.dbConnection.query(`SELECT * FROM manage_camps_collection_centers.3_getsterapp_${country_code}_${camp_id}_camp_center_collection_bags_stock_management
   where bag_id = '${empty_bag_id_new.bag_id}' and bag_collection_center_id = '${empty_bag_id_new.bag_collection_center_id}'
   and is_this_empty_bag_packed_inside_collection_bag = 0 
   and empty_bag_packed_inside_bag_collection_center_id  Is NULL
   and empty_bag_packed_inside_bag_id Is NULL
  
  `);
            const empty_bag_id_check_bag_id = await app_module_1.dbConnection.query(`SELECT * FROM manage_camps_collection_centers.3_getsterapp_${country_code}_${camp_id}_camp_center_collection_bags_stock_management
  where bag_id = '${empty_bag_id_new.bag_id}' 
  and is_this_empty_bag_packed_inside_collection_bag = 0 
  and empty_bag_packed_inside_bag_collection_center_id  Is NULL
  and empty_bag_packed_inside_bag_id Is NULL
 
 `);
            const empty_bag_id_check_bag_collection_center_id = await app_module_1.dbConnection.query(`SELECT * FROM manage_camps_collection_centers.3_getsterapp_${country_code}_${camp_id}_camp_center_collection_bags_stock_management
 where bag_id != '${empty_bag_id_new.bag_id}' 
 and is_this_empty_bag_packed_inside_collection_bag = 0 
 and empty_bag_packed_inside_bag_collection_center_id  Is NULL
 and empty_bag_packed_inside_bag_id Is NULL

`);
            const empty_bag_id_inner_bag_id = await app_module_1.dbConnection.query(`SELECT * FROM manage_camps_collection_centers.3_getsterapp_${country_code}_${camp_id}_camp_center_collection_bags_stock_management
where bag_id = '${empty_bag_id_new.bag_id}' and bag_collection_center_id = '${empty_bag_id_new.bag_collection_center_id}'
and is_this_empty_bag_packed_inside_collection_bag = 1 
and empty_bag_packed_inside_bag_collection_center_id  Is NOT NULL
and empty_bag_packed_inside_bag_id Is NOT NULL

`);
            const empty_bag_id_inner_bag_id_not_centerid = await app_module_1.dbConnection.query(`SELECT * FROM manage_camps_collection_centers.3_getsterapp_${country_code}_${camp_id}_camp_center_collection_bags_stock_management
where bag_id = '${empty_bag_id_new.bag_id}' 
and is_this_empty_bag_packed_inside_collection_bag = 1 
and empty_bag_packed_inside_bag_collection_center_id  Is NOT NULL
and empty_bag_packed_inside_bag_id Is NOT NULL

`);
            const empty_bag_id_inner_bag_id_centerid = await app_module_1.dbConnection.query(`SELECT * FROM manage_camps_collection_centers.3_getsterapp_${country_code}_${camp_id}_camp_center_collection_bags_stock_management
where bag_id != '${empty_bag_id_new.bag_id}' 
and is_this_empty_bag_packed_inside_collection_bag = 1 
and empty_bag_packed_inside_bag_collection_center_id  Is NOT NULL
and empty_bag_packed_inside_bag_id Is NOT NULL

`);
            if (empty_bag_id.length == 1 || empty_bag_id_check_bag_id.length == 1) {
                let id = "This outer bag id is already exist";
                return id;
            }
            if (empty_bag_id_check_bag_collection_center_id.length == 1) {
                let id = "This outer bag id is already exist";
                return id;
            }
            if (empty_bag_id_inner_bag_id.length == 1 || empty_bag_id_inner_bag_id_not_centerid.length == 1 || empty_bag_id_inner_bag_id_centerid.length == 1) {
                let id = "This inner bag id is already exist";
                return id;
            }
            if (empty_bag_id.length == 0 || empty_bag_id_check_bag_id.length == 0 || empty_bag_id_check_bag_collection_center_id.length == 0) {
                const inserting_bag_id = await app_module_1.dbConnection.query(`insert into manage_camps_collection_centers.3_getsterapp_${country_code}_${camp_id}_camp_center_collection_bags_stock_management (
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
        ${mysql.escape(empty_bag_id_new.empty_bag_packing_in_outer_bag_verified_by_getster_id)})`);
                if (inserting_bag_id) {
                    let id = 'Entered outer bag id is inserted';
                    return id;
                }
            }
            if (empty_bag_id_inner_bag_id.length == 0 || empty_bag_id_inner_bag_id_not_centerid.length == 0 || empty_bag_id_inner_bag_id_centerid.length == 0) {
                const inserting_bag_id = await app_module_1.dbConnection.query(`insert into manage_camps_collection_centers.3_getsterapp_${country_code}_${camp_id}_camp_center_collection_bags_stock_management (
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
        ${mysql.escape(empty_bag_id_new.empty_bag_packing_in_outer_bag_verified_by_getster_id)})`);
                if (inserting_bag_id) {
                    let id = 'Entered outer bag id is inserted';
                    return id;
                }
            }
        }
        catch (error) {
            throw error;
        }
    }
    async postingEmptyInnerBagIDInsert(data, audittable, country_code, camp_id, time_zone_iana_string) {
        try {
            const datetime = this.datetimeservice.getDateTime(time_zone_iana_string);
            const empty_bag_id = await app_module_1.dbConnection.query(`SELECT * FROM manage_camps_collection_centers.3_getsterapp_${country_code}_${camp_id}_camp_center_collection_bags_stock_management
      where bag_id = '${data.bag_id}' and bag_collection_center_id = '${data.bag_collection_center_id}'
      and is_this_empty_bag_packed_inside_collection_bag = 0 
      and empty_bag_packed_inside_bag_collection_center_id  Is NULL
      and empty_bag_packed_inside_bag_id Is NULL
     
     `);
            const empty_bag_id_check_bag_id = await app_module_1.dbConnection.query(`SELECT * FROM manage_camps_collection_centers.3_getsterapp_${country_code}_${camp_id}_camp_center_collection_bags_stock_management
     where bag_id = '${data.bag_id}' 
     and is_this_empty_bag_packed_inside_collection_bag = 0 
     and empty_bag_packed_inside_bag_collection_center_id  Is NULL
     and empty_bag_packed_inside_bag_id Is NULL
    
    `);
            const empty_bag_id_check_bag_collection_center_id = await app_module_1.dbConnection.query(`SELECT * FROM manage_camps_collection_centers.3_getsterapp_${country_code}_${camp_id}_camp_center_collection_bags_stock_management
    where bag_id != '${data.bag_id}' 
    and is_this_empty_bag_packed_inside_collection_bag = 0 
    and empty_bag_packed_inside_bag_collection_center_id  Is NULL
    and empty_bag_packed_inside_bag_id Is NULL
   
   `);
            const empty_bag_id_inner_bag_id = await app_module_1.dbConnection.query(`SELECT * FROM manage_camps_collection_centers.3_getsterapp_${country_code}_${camp_id}_camp_center_collection_bags_stock_management
   where bag_id = '${data.bag_id}' and bag_collection_center_id = '${data.bag_collection_center_id}'
   and is_this_empty_bag_packed_inside_collection_bag = 1 
   and empty_bag_packed_inside_bag_collection_center_id  Is NOT NULL
   and empty_bag_packed_inside_bag_id Is NOT NULL
   
   `);
            const empty_bag_id_inner_bag_id_not_centerid = await app_module_1.dbConnection.query(`SELECT * FROM manage_camps_collection_centers.3_getsterapp_${country_code}_${camp_id}_camp_center_collection_bags_stock_management
   where bag_id = '${data.bag_id}' 
   and is_this_empty_bag_packed_inside_collection_bag = 1 
   and empty_bag_packed_inside_bag_collection_center_id  Is NOT NULL
   and empty_bag_packed_inside_bag_id Is NOT NULL
   
   `);
            const empty_bag_id_inner_bag_id_centerid = await app_module_1.dbConnection.query(`SELECT * FROM manage_camps_collection_centers.3_getsterapp_${country_code}_${camp_id}_camp_center_collection_bags_stock_management
   where bag_id != '${data.bag_id}' 
   and is_this_empty_bag_packed_inside_collection_bag = 1 
   and empty_bag_packed_inside_bag_collection_center_id  Is NOT NULL
   and empty_bag_packed_inside_bag_id Is NOT NULL
   
   `);
            if (empty_bag_id.length == 1 || empty_bag_id_check_bag_id.length == 1) {
                let id = "This outer bag id is already exist";
                return id;
            }
            if (empty_bag_id_check_bag_collection_center_id.length == 1) {
                let id = "This outer bag id is already exist";
                return id;
            }
            if (empty_bag_id_inner_bag_id.length == 1 || empty_bag_id_inner_bag_id_not_centerid.length == 1 || empty_bag_id_inner_bag_id_centerid.length == 1) {
                let id = "This inner bag id is already exist";
                return id;
            }
            if (empty_bag_id.length == 0 || empty_bag_id_check_bag_id.length == 0 || empty_bag_id_check_bag_collection_center_id.length == 0) {
                const inserting_bag_id = await app_module_1.dbConnection.query(`insert into manage_camps_collection_centers.3_getsterapp_${country_code}_${camp_id}_camp_center_collection_bags_stock_management(
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
            ${mysql.escape(data.empty_bag_packing_in_outer_bag_verified_by_getster_id)})`);
                if (inserting_bag_id) {
                    let id = "Inserted Successfully";
                    return id;
                }
            }
            if (empty_bag_id_inner_bag_id.length == 0 || empty_bag_id_inner_bag_id_not_centerid.length == 0 || empty_bag_id_inner_bag_id_centerid.length == 0) {
                const inserting_bag_id = await app_module_1.dbConnection.query(`insert into manage_camps_collection_centers.3_getsterapp_${country_code}_${camp_id}_camp_center_collection_bags_stock_management(
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
            ${mysql.escape(data.empty_bag_packing_in_outer_bag_verified_by_getster_id)})`);
                if (inserting_bag_id) {
                    let id = "Inserted Successfully";
                    return id;
                }
            }
        }
        catch (error) {
            throw error;
        }
        finally {
        }
    }
    async checkingOuterBagidExistOrNot(empty_bag_id_new, audittable, country_code, camp_id, time_zone_iana_string) {
        try {
            const datetime = this.datetimeservice.getDateTime(time_zone_iana_string);
            const empty_bag_id = await app_module_1.dbConnection.query(`SELECT * FROM manage_camps_collection_centers.3_getsterapp_${country_code}_${camp_id}_camp_center_collection_bags_stock_management
       where bag_id = '${empty_bag_id_new.bag_id}' 
       and is_this_empty_bag_packed_inside_collection_bag = 0 
       and empty_bag_packed_inside_bag_collection_center_id  Is NULL
       and empty_bag_packed_inside_bag_id Is NULL
      
      `);
            let bagid;
            let id = 'Outer id does not exist';
            for (let i of empty_bag_id) {
                bagid = i.bag_id;
                if (bagid) {
                    return bagid;
                }
            }
            if (empty_bag_id.length == 0) {
                return id;
            }
        }
        catch (error) {
            throw error;
        }
    }
    async postingEmptyOuterBagID(empty_bag_id_new, country_code, camp_id) {
        try {
            const empty_bag_id = await app_module_1.dbConnection.query(`SELECT * FROM manage_camps_collection_centers.3_getsterapp_${country_code}_${camp_id}_camp_center_collection_bags_stock_management
      where bag_id = '${empty_bag_id_new.bag_id}' and bag_collection_center_id = '${empty_bag_id_new.bag_collection_center_id}'
      and is_this_empty_bag_packed_inside_collection_bag = 0 
      and empty_bag_packed_inside_bag_collection_center_id  Is NULL
      and empty_bag_packed_inside_bag_id Is NULL
     
     `);
            const empty_bag_id_check_bag_id = await app_module_1.dbConnection.query(`SELECT * FROM manage_camps_collection_centers.3_getsterapp_${country_code}_${camp_id}_camp_center_collection_bags_stock_management
     where bag_id = '${empty_bag_id_new.bag_id}' 
     and is_this_empty_bag_packed_inside_collection_bag = 0 
     and empty_bag_packed_inside_bag_collection_center_id  Is NULL
     and empty_bag_packed_inside_bag_id Is NULL
    
    `);
            const empty_bag_id_check_bag_collection_center_id = await app_module_1.dbConnection.query(`SELECT * FROM manage_camps_collection_centers.3_getsterapp_${country_code}_${camp_id}_camp_center_collection_bags_stock_management
    where bag_id != '${empty_bag_id_new.bag_id}' 
    and is_this_empty_bag_packed_inside_collection_bag = 0 
    and empty_bag_packed_inside_bag_collection_center_id  Is NULL
    and empty_bag_packed_inside_bag_id Is NULL
   
   `);
            const empty_bag_id_inner_bag_id = await app_module_1.dbConnection.query(`SELECT * FROM manage_camps_collection_centers.3_getsterapp_${country_code}_${camp_id}_camp_center_collection_bags_stock_management
   where bag_id = '${empty_bag_id_new.bag_id}' and bag_collection_center_id = '${empty_bag_id_new.bag_collection_center_id}'
   and is_this_empty_bag_packed_inside_collection_bag = 1 
   and empty_bag_packed_inside_bag_collection_center_id  Is NOT NULL
   and empty_bag_packed_inside_bag_id Is NOT NULL
   
   `);
            const empty_bag_id_inner_bag_id_not_centerid = await app_module_1.dbConnection.query(`SELECT * FROM manage_camps_collection_centers.3_getsterapp_${country_code}_${camp_id}_camp_center_collection_bags_stock_management
   where bag_id = '${empty_bag_id_new.bag_id}' 
   and is_this_empty_bag_packed_inside_collection_bag = 1 
   and empty_bag_packed_inside_bag_collection_center_id  Is NOT NULL
   and empty_bag_packed_inside_bag_id Is NOT NULL
   
   `);
            const empty_bag_id_inner_bag_id_centerid = await app_module_1.dbConnection.query(`SELECT * FROM manage_camps_collection_centers.3_getsterapp_${country_code}_${camp_id}_camp_center_collection_bags_stock_management
   where bag_id != '${empty_bag_id_new.bag_id}' 
   and is_this_empty_bag_packed_inside_collection_bag = 1 
   and empty_bag_packed_inside_bag_collection_center_id  Is NOT NULL
   and empty_bag_packed_inside_bag_id Is NOT NULL
   
   `);
            if (empty_bag_id.length == 1 || empty_bag_id_check_bag_id.length == 1) {
                let id = "This outer bag id is already exist";
                return id;
            }
            if (empty_bag_id_check_bag_collection_center_id.length == 1) {
                let id = "This outer bag id is already exist";
                return id;
            }
            if (empty_bag_id_inner_bag_id.length == 1 || empty_bag_id_inner_bag_id_not_centerid.length == 1 || empty_bag_id_inner_bag_id_centerid.length == 1) {
                let id = "This inner bag id is already exist";
                return id;
            }
            if (empty_bag_id.length == 0 || empty_bag_id_check_bag_id.length == 0 || empty_bag_id_check_bag_collection_center_id.length == 0) {
                let id = "Inserted Successfully";
                return id;
            }
            if (empty_bag_id_inner_bag_id.length == 0 || empty_bag_id_inner_bag_id_not_centerid.length == 0 || empty_bag_id_inner_bag_id_centerid.length == 0) {
                let id = "Inserted Successfully";
                return id;
            }
        }
        catch (error) {
            throw error;
        }
    }
    async postingEmptyInnerBagID(empty_bag_id_new, country_code, camp_id) {
        try {
            const empty_bag_id = await app_module_1.dbConnection.query(`SELECT * FROM manage_camps_collection_centers.3_getsterapp_${country_code}_${camp_id}_camp_center_collection_bags_stock_management
      where bag_id = '${empty_bag_id_new.bag_id}' and bag_collection_center_id = '${empty_bag_id_new.bag_collection_center_id}'
      and is_this_empty_bag_packed_inside_collection_bag = 0 
      and empty_bag_packed_inside_bag_collection_center_id  Is NULL
      and empty_bag_packed_inside_bag_id Is NULL
     
     `);
            const empty_bag_id_check_bag_id = await app_module_1.dbConnection.query(`SELECT * FROM manage_camps_collection_centers.3_getsterapp_${country_code}_${camp_id}_camp_center_collection_bags_stock_management
     where bag_id = '${empty_bag_id_new.bag_id}' 
     and is_this_empty_bag_packed_inside_collection_bag = 0 
     and empty_bag_packed_inside_bag_collection_center_id  Is NULL
     and empty_bag_packed_inside_bag_id Is NULL
    
    `);
            const empty_bag_id_check_bag_collection_center_id = await app_module_1.dbConnection.query(`SELECT * FROM manage_camps_collection_centers.3_getsterapp_${country_code}_${camp_id}_camp_center_collection_bags_stock_management
    where bag_id != '${empty_bag_id_new.bag_id}' 
    and is_this_empty_bag_packed_inside_collection_bag = 0 
    and empty_bag_packed_inside_bag_collection_center_id  Is NULL
    and empty_bag_packed_inside_bag_id Is NULL
   
   `);
            const empty_bag_id_inner_bag_id = await app_module_1.dbConnection.query(`SELECT * FROM manage_camps_collection_centers.3_getsterapp_${country_code}_${camp_id}_camp_center_collection_bags_stock_management
   where bag_id = '${empty_bag_id_new.bag_id}' and bag_collection_center_id = '${empty_bag_id_new.bag_collection_center_id}'
   and is_this_empty_bag_packed_inside_collection_bag = 1 
   and empty_bag_packed_inside_bag_collection_center_id  Is NOT NULL
   and empty_bag_packed_inside_bag_id Is NOT NULL
   
   `);
            const empty_bag_id_inner_bag_id_not_centerid = await app_module_1.dbConnection.query(`SELECT * FROM manage_camps_collection_centers.3_getsterapp_${country_code}_${camp_id}_camp_center_collection_bags_stock_management
   where bag_id = '${empty_bag_id_new.bag_id}' 
   and is_this_empty_bag_packed_inside_collection_bag = 1 
   and empty_bag_packed_inside_bag_collection_center_id  Is NOT NULL
   and empty_bag_packed_inside_bag_id Is NOT NULL
   
   `);
            const empty_bag_id_inner_bag_id_centerid = await app_module_1.dbConnection.query(`SELECT * FROM manage_camps_collection_centers.3_getsterapp_${country_code}_${camp_id}_camp_center_collection_bags_stock_management
   where bag_id != '${empty_bag_id_new.bag_id}' 
   and is_this_empty_bag_packed_inside_collection_bag = 1 
   and empty_bag_packed_inside_bag_collection_center_id  Is NOT NULL
   and empty_bag_packed_inside_bag_id Is NOT NULL
   
   `);
            if (empty_bag_id.length == 1 || empty_bag_id_check_bag_id.length == 1) {
                let id = "This outer bag id is already exist";
                return id;
            }
            if (empty_bag_id_check_bag_collection_center_id.length == 1) {
                let id = "This outer bag id is already exist";
                return id;
            }
            if (empty_bag_id_inner_bag_id.length == 1 || empty_bag_id_inner_bag_id_not_centerid.length == 1 || empty_bag_id_inner_bag_id_centerid.length == 1) {
                let id = "This inner bag id is already exist";
                return id;
            }
            if (empty_bag_id.length == 0 || empty_bag_id_check_bag_id.length == 0 || empty_bag_id_check_bag_collection_center_id.length == 0) {
                let id = "Inserted Successfully";
                return id;
            }
            if (empty_bag_id_inner_bag_id.length == 0 || empty_bag_id_inner_bag_id_not_centerid.length == 0 || empty_bag_id_inner_bag_id_centerid.length == 0) {
                let id = "Inserted Successfully";
                return id;
            }
        }
        catch (error) {
            throw error;
        }
    }
    async verifyingEmptyInnerBagID(empty_bag_id_new, audittable, country_code, camp_id, time_zone_iana_string) {
        try {
            const datetime = this.datetimeservice.getDateTime(time_zone_iana_string);
            const empty_bag_id_inner_bags = await app_module_1.dbConnection.query(`SELECT * FROM manage_camps_collection_centers.3_getsterapp_${country_code}_${camp_id}_camp_center_collection_bags_stock_management
                     where bag_id = '${empty_bag_id_new.bag_id}' 
                  
                    
                    `);
            const empty_bag_id_inner_bags1 = await app_module_1.dbConnection.query(`SELECT * FROM manage_camps_collection_centers.3_getsterapp_${country_code}_${camp_id}_camp_center_collection_bags_stock_management 
                    where bag_id != '${empty_bag_id_new.bag_id}' 
                  
                   
                   `);
            let result = [];
            for (let id of empty_bag_id_inner_bags) {
                let bid = id.empty_bag_packed_inside_bag_id;
                if (bid) {
                    result.push(bid);
                }
                if (bid == null) {
                    let bid = 'Not found';
                    if (bid) {
                        result.push(bid);
                    }
                }
            }
            return result;
        }
        catch (error) {
            throw error;
        }
    }
    async deleteRecords(bag_id, audittable, country_code, camp_id, time_zone_iana_string) {
        try {
            const deleting_record = await app_module_1.dbConnection.query(`DELETE FROM manage_camps_collection_centers.3_getsterapp_${country_code}_${camp_id}_camp_center_collection_bags_stock_management WHERE bag_id = ${bag_id}`);
            const datetime = this.datetimeservice.getDateTime(time_zone_iana_string);
            if (deleting_record) {
            }
        }
        catch (error) {
            throw error;
        }
    }
    async getAuditTrail(pageno, per_page) {
        const db_name = "in_1_edu_customer_db";
        try {
            let offset = pageno * per_page;
            const table_row = await app_module_1.dbConnection.query(`SELECT COUNT(*) AS row_count FROM ${db_name}.audit_trail_packing_empty_bags`);
            let query = `SELECT CONCAT(in_1_edu_customer_db.user_profile.first_name, ' ', in_1_edu_customer_db.user_profile.last_name) AS user_name, in_1_edu_customer_db.audit_trail_packing_empty_bags.entry_by_user_id, entry_type, entry_date_time FROM in_1_edu_customer_db.audit_trail_packing_empty_bags  JOIN in_1_edu_customer_db.user_profile ON user_profile.user_id = audit_trail_packing_empty_bags.entry_by_user_id where  user_id  >  0 * 5`;
            if (per_page && per_page.charAt(0).toUpperCase() + per_page.slice(1) !== "All") {
                query += ` LIMIT ${offset}, ${per_page}`;
            }
            const getster_ids = await app_module_1.dbConnection.query(query);
            const getResult = {
                count: table_row[0].row_count,
                getster_ids: getster_ids,
            };
            return getResult;
        }
        catch (error) {
            throw error;
        }
    }
    async getAuditTrailVerify(pageno, per_page) {
        const db_name = "in_1_edu_customer_db";
        const connection = app_module_1.dbConnection;
        try {
            let offset = pageno * per_page;
            const [table_row] = await connection.query(`SELECT COUNT(*) AS row_count FROM ${db_name}.audit_trail_for_verifying_packed_bags`);
            let query = `SELECT CONCAT(in_1_edu_customer_db.user_profile.first_name, ' ', in_1_edu_customer_db.user_profile.last_name) AS user_name, in_1_edu_customer_db.audit_trail_for_verifying_packed_bags.entry_by_user_id, entry_type, entry_date_time FROM in_1_edu_customer_db.audit_trail_for_verifying_packed_bags JOIN in_1_edu_customer_db.user_profile ON user_profile.user_id = audit_trail_for_verifying_packed_bags.entry_by_user_id where  user_id  >  0 * 5`;
            if (per_page && per_page.charAt(0).toUpperCase() + per_page.slice(1) !== "All") {
                query += ` LIMIT ${offset}, ${per_page}`;
            }
            const getster_ids = await connection.query(query);
            const getResult = {
                count: table_row.row_count,
                getster_ids: getster_ids,
            };
            return getResult;
        }
        catch (error) {
            throw error;
        }
    }
};
EmptyBagStoreDataService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [date_time_service_1.DateTimeService])
], EmptyBagStoreDataService);
exports.EmptyBagStoreDataService = EmptyBagStoreDataService;
//# sourceMappingURL=empty-bag-store-data.service.js.map