import { Observable } from "rxjs";
export abstract class IApiManagerService {
    abstract getRequest(url: string): Observable<any>;
    abstract getRequestDownloadFile(url: string): Observable<any>;
    abstract postRequest(url: string, model: any): Observable<any>;
    abstract postRequestDownloadFile(url: string, model: any): Observable<any>; 
}
