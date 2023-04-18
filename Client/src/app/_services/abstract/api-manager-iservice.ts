import { Observable } from "rxjs";

export abstract class IApiManagerService {
    abstract getRequest(url: string);
    abstract getRequestDownloadFile(url: string);
    abstract postRequest(url: string, model: any): Observable<any>;
    abstract postRequestDownloadFile(url: string, model: any): Observable<any>; 
}