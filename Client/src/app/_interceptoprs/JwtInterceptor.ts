import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountService } from '../_services/account.service';
import { User } from '../_models/user';
import { take } from 'rxjs/operators';


// @Injectable()
// export class JwtInterceptor implements HttpInterceptor {

//   constructor(private accountService: AccountService) { }

//   intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
//     let currentUser: User;
//     this.accountService.currentUser$.pipe(take(1)).subscribe(user => currentUser = user);
//     if (currentUser) {
//       request = request.clone({
//         setHeaders: {
//           Authorization: `Bearer ${currentUser.token}`
//         }
//       });
//     }
//     return next.handle(request);
//   }
// }

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let currentUser = JSON.parse(localStorage.getItem('user'));
        if (currentUser && currentUser.token) {
            // request = request.clone({
            //     setHeaders: { 
            //         Authorization: `Bearer ${currentUser.token}`
            //     }
            // });
            const httpRequest = request.clone({
                headers: request.headers
                    .set('Cache-Control', 'no-cache')
                    .set('Pragma', 'no-cache')
                    .set('Expires', '0')
                    .set('Authorization', `Bearer ${currentUser.token}`)
                    .set('X-User-Id', currentUser.userId)
            })
            return next.handle(httpRequest);
        }        
    }
}