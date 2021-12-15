import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { delay, finalize, Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loadingSpinner: NgxSpinnerService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.loadingSpinner.show();
    return next
      .handle(request)
      .pipe(finalize(() => this.loadingSpinner.hide()));
  }
}
