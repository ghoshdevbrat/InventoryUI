import { Observable } from "rxjs";
export abstract class IAdminService {
    abstract getQueries();
    abstract getStates();
}