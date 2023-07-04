import { HttpStatus } from "@nestjs/common";
import { Request } from "express";
import { AuthService } from "src/auth/services/auth.service";
import { EmptyBagIdNewDTO, EmptyBagIdNewInsertDTO, EmptyBagIdNewScanDTO, EmptyBagIdVerifyDTO, VerifyAuditTrailDto } from "src/models/dto/empty-bagid.dto";
import { EmptyBagStoreDataService } from "../../services/empty-bag-store-data/empty-bag-store-data.service";
export declare class EmptyBagStoreDataController {
    private readonly appService;
    private _authService;
    constructor(appService: EmptyBagStoreDataService, _authService: AuthService);
    deleteRecords(ids: number, audit: VerifyAuditTrailDto, request: Request): Promise<any>;
    postingEmptyOuterBagID(bag_id: EmptyBagIdNewScanDTO, request: Request): Promise<any>;
    postingEmptyOuterBagIDInsert(bag_id: EmptyBagIdNewDTO, audit: VerifyAuditTrailDto, request: Request): Promise<any>;
    postingEmptyInnerBagIDInsert(bag_id: EmptyBagIdNewDTO, audit: VerifyAuditTrailDto, request: Request): Promise<any>;
    postingEmptyInnerBagID(bag_id: EmptyBagIdNewInsertDTO, request: Request): Promise<any>;
    checkingOuterBagidExistOrNot(bag_id: EmptyBagIdVerifyDTO, audit: VerifyAuditTrailDto, request: Request): Promise<any>;
    verifyingEmptyInnerBagID(bag_id: EmptyBagIdVerifyDTO, audit: VerifyAuditTrailDto, request: Request): Promise<any>;
    verifyingOuterBagID(bag_id: EmptyBagIdVerifyDTO, request: Request): Promise<any>;
    wow_education_coordinator_syllabus_details_audit_trail(pageno: number, per_page: string): Promise<{
        statuscode: HttpStatus;
        message: string;
        count: any;
        data: any;
    }>;
    getAuditTrailVerify(pageno: number, per_page: string): Promise<{
        statuscode: HttpStatus;
        message: string;
        count: any;
        data: any;
    }>;
    getToken(): Promise<any>;
}
