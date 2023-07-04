export declare class DateTimeService {
    getDateTime(timeZoneIanaString: string): string;
    getDate(timeZoneIanaString: string): string;
    getTime(timeZoneIanaString: string): string;
    setDateTime(dateTime: string): string;
    cuttentTimestamp(): Promise<any>;
}
