import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from '../component/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {
  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }
  confirm(title = 'Confirmation', 
          message = 'Are you sure?', 
          btnOkText = 'Confirm',
          btnCancelText = 'Cancel'): Observable<boolean> {
      const config = {
        initialState: {
          title, message, btnOkText, btnCancelText
        }
      }
      this.bsModalRef = this.modalService.show(ConfirmDialogComponent, config);
      return new Observable<boolean>(this.getResult());
  }

  private getResult() {
    return (obserer) => {
      const subscription = this.bsModalRef.onHidden.subscribe(() => {
        obserer.next(this.bsModalRef.content.result);
        obserer.complete();
      });

      return {
        unsubscribe() {
          subscription.unsubscribe();
        }
      }
    }
  }
}
