import {

  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,

  Query,

  Req,

  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth } from "@nestjs/swagger";
import { Request } from "express";
import { JwtAuthGuard } from "src/auth/guard/jwt-auth.guard";
import { AuthService } from "src/auth/services/auth.service";
import { AuditTrailDto, EmptyBagIdNewDTO, EmptyBagIdNewInsertDTO, EmptyBagIdNewScanDTO, EmptyBagIdVerifyDTO, VerifyAuditTrailDto } from "src/models/dto/empty-bagid.dto";
import { EmptyBagStoreDataService } from "../../services/empty-bag-store-data/empty-bag-store-data.service";


@Controller("empty-bag-store-data")
export class EmptyBagStoreDataController {
  constructor(private readonly appService: EmptyBagStoreDataService, private _authService: AuthService) { }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Delete('delete-records')
  async deleteRecords(@Query('ids') ids: number, @Query() audit: VerifyAuditTrailDto, @Req() request: Request): Promise<any> {
    try {

      let token = String(request.headers.authorization).replace('Bearer ', '');
      let _data = await this._authService
        .verifyJwt(token)
        .then((data) => data.user);
      const {

        camp_id,
        country_code,
        time_zone_iana_string,
      } = _data;

      await this.appService.deleteRecords(ids, audit,country_code, camp_id,time_zone_iana_string);
      return {
        status: 200,
        message: 'Bag Id deleted successfully',
      };
    } catch (error) {
      throw error;
    }
  }








  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Post('posting-empty-outer-bag-id') ///posting-empty-outer-bag-id-2

  async postingEmptyOuterBagID(@Query() bag_id: EmptyBagIdNewScanDTO,@Req() request: Request
  ): Promise<any> { //postingEmptyOuterBagID2()
    try {
      let token = String(request.headers.authorization).replace('Bearer ', '');
      let _data = await this._authService
        .verifyJwt(token)
        .then((data) => data.user);
      const {

        country_code, camp_id
      } = _data;
      let au: any = await this.appService.postingEmptyOuterBagID(bag_id,country_code,camp_id);
      if (au) {
        return {
          statusCode: HttpStatus.OK,
          message: 'Outer Bag, Fetched Successfully!',
          data: au,
        };
      } else {
        return {
          statusCode: HttpStatus.OK,
          message: 'Outer Bag, You Entered Does Not Exist!',
          data: 'Null',
        };
      }
    } catch (error) {
      throw error;
    }
  }




  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Post('posting-empty-outer-bag-id-insert')
  async postingEmptyOuterBagIDInsert(@Query() bag_id: EmptyBagIdNewDTO, @Query() audit: VerifyAuditTrailDto, @Req() request: Request): Promise<any> {
    try {


      let token = String(request.headers.authorization).replace('Bearer ', '');
      let _data = await this._authService
        .verifyJwt(token)
        .then((data) => data.user);
      const {
        country_code, camp_id,
        time_zone_iana_string,
      } = _data;

      console.log(request.headers.authorization);


      let au: any = await this.appService.postingEmptyOuterBagIDInsert(bag_id, audit,     country_code, camp_id, time_zone_iana_string);
      if (au) {
        return {
          statusCode: HttpStatus.OK,
          message: 'Outer Bag ID, Fetched Successfully!',
          data: au,
        };
      } else {
        return {
          statusCode: HttpStatus.OK,
          message: 'Outer Bag, You Entered Does Not Exist!',
          data: 'Null',
        };
      }
    } catch (error) {
      throw error;
    }
  }


  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Post('posting-empty-inner-bag-id_insert')
  async postingEmptyInnerBagIDInsert(@Query() bag_id: EmptyBagIdNewDTO, @Query() audit: VerifyAuditTrailDto, @Req() request: Request): Promise<any> {
    try {

      let token = String(request.headers.authorization).replace('Bearer ', '');
      let _data = await this._authService
        .verifyJwt(token)
        .then((data) => data.user);
      const {
        country_code, camp_id,
        time_zone_iana_string,
      } = _data;
      let au: any = await this.appService.postingEmptyInnerBagIDInsert(bag_id, audit,     country_code, camp_id, time_zone_iana_string);
      if (au) {
        return {
          statusCode: HttpStatus.OK,
          message: 'Inner Bag ID, Fetched Successfully!',
          data: au,
        };
      } else {
        return {
          statusCode: HttpStatus.OK,
          message: 'Inner Bag ID, You Entered Does Not Exist!',
          data: 'Null',
        };
      }
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Post('posting-empty-inner-bag-id')
  async postingEmptyInnerBagID(@Query() bag_id: EmptyBagIdNewInsertDTO,@Req() request: Request): Promise<any> {
    try {
      let token = String(request.headers.authorization).replace('Bearer ', '');
      let _data = await this._authService
        .verifyJwt(token)
        .then((data) => data.user);
      const {
        country_code, camp_id
     
      } = _data;
      let au: any = await this.appService.postingEmptyInnerBagID(bag_id,country_code, camp_id);
      if (au) {
        return {
          statusCode: HttpStatus.OK,
          message: 'Inner Bag ID, Fetched Successfully!',
          data: au,
        };
      } else {
        return {
          statusCode: HttpStatus.OK,
          message: 'Inner Bag ID, You Entered Does Not Exist!',
          data: 'Null',
        };
      }
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Post('checking-outer-bagid-exist-or-not')
  async checkingOuterBagidExistOrNot(@Query() bag_id: EmptyBagIdVerifyDTO, @Query() audit: VerifyAuditTrailDto, @Req() request: Request): Promise<any> {
    try {
      let token = String(request.headers.authorization).replace('Bearer ', '');
      let _data = await this._authService
        .verifyJwt(token)
        .then((data) => data.user);
      const {
        country_code,
        camp_id,
        time_zone_iana_string,
      } = _data;
      let au: any = await this.appService.checkingOuterBagidExistOrNot(bag_id, audit,  country_code,
        camp_id, time_zone_iana_string);
      if (au) {
        return {
          statusCode: HttpStatus.OK,
          message: 'Outer Bag ID, Fetched Successfully!',
          data: au,
        };
      } else {
        return {
          statusCode: HttpStatus.OK,
          message: 'Outer Bag ID, You Entered Does Not Exist!',
          data: 'Null',
        };
      }
    } catch (error) {
      throw error;
    }
  }





  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Post('verifying-empty-inner-bag-id')
  async verifyingEmptyInnerBagID(@Query() bag_id: EmptyBagIdVerifyDTO, @Query() audit: VerifyAuditTrailDto, @Req() request: Request): Promise<any> {
    try {
      let token = String(request.headers.authorization).replace('Bearer ', '');
      let _data = await this._authService
        .verifyJwt(token)
        .then((data) => data.user);
      const {
        country_code,
        camp_id,
        time_zone_iana_string,
      } = _data;
      let au: any = await this.appService.verifyingEmptyInnerBagID(bag_id, audit,  country_code,
        camp_id, time_zone_iana_string);
      if (au) {
        return {
          statusCode: HttpStatus.OK,
          message: 'Inner Bag ID, Fetched Successfully!',
          data: au,
        };
      } else {
        return {
          statusCode: HttpStatus.OK,
          message: 'Inner Bag ID, You Entered Does Not Exist!',
          data: 'Null',
        };
      }
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Post('verifying-outer-bag_id')
  async verifyingOuterBagID(@Query() bag_id: EmptyBagIdVerifyDTO,@Req() request: Request): Promise<any> {
    try {
      let token = String(request.headers.authorization).replace('Bearer ', '');
      let _data = await this._authService
        .verifyJwt(token)
        .then((data) => data.user);
      const {
        country_code, camp_id
     
      } = _data;
      let au: any = await this.appService.verifyingOuterBagID(bag_id, country_code, camp_id);
      if (au) {
        return {
          statusCode: HttpStatus.OK,
          message: 'Outer Bag ID, Fetched Successfully!',
          data: au,
        };
      } else {
        return {
          statusCode: HttpStatus.OK,
          message: 'Outer Bag ID, You Entered Does Not Exist!',
          data: 'Null',
        };
      }
    } catch (error) {
      throw error;
    }
  }






  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Get('get-audit-trail')
  async wow_education_coordinator_syllabus_details_audit_trail(
    @Query("pageno") pageno: number,
    @Query("per_page") per_page: string
  ) {
    try {
      const get_audit_trail_data =
        await this.appService.getAuditTrail(
          pageno,
          per_page
        );

      const results = get_audit_trail_data.getster_ids.map((result) => ({
        user_name: result.user_name,
        entry_by_user_id: result.entry_by_user_id,
        entry_type: result.entry_type,
        entry_date_time: result.entry_date_time,
      }));

      const count = get_audit_trail_data.count;

      return {
        statuscode: HttpStatus.OK,
        message: "Get Data Successful",
        count: count,
        data: results,
      };
    } catch (error) {
      throw error;
    }
  }


  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Get('get-audit-trail-verify')
  async getAuditTrailVerify(
    @Query("pageno") pageno: number,
    @Query("per_page") per_page: string
  ) {
    try {
      const get_audit_trail_data =
        await this.appService.getAuditTrailVerify(
          pageno,
          per_page
        );

      const results = get_audit_trail_data.getster_ids.map((result) => ({
        user_name: result.user_name,
        entry_by_user_id: result.entry_by_user_id,
        entry_type: result.entry_type,
        entry_date_time: result.entry_date_time,
      }));

      const count = get_audit_trail_data.count;

      return {
        statuscode: HttpStatus.OK,
        message: "Get Data Successful",
        count: count,
        data: results,
      };
    } catch (error) {
      throw error;
    }
  }


  @Get('get-token')
  async getToken(): Promise<any> {
    try {
      let payload = {
        country_code:'in',
        camp_id: 12,
        time_zone_iana_string: "Asia/Kolkata"
      }
      let token = await this._authService.generateJwt(payload)
      return {
        statusCode: HttpStatus.OK,
        message: 'Get token Successful',
        data: token
      };
    } catch (error) {
      throw error;
    }
  }

}




