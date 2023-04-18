import { Observable } from "rxjs";
import { User } from "src/app/_model/user";

export abstract class IAccountService {  
  abstract login(model: any): Observable<any>;
  abstract logout(): void;
}
