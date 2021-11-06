import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import Swal from 'sweetalert2';

@Injectable()
export class SizeBodyInterceptor implements HttpInterceptor {

  constructor(private loading: SharedLoadingService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.sizeMiB(this.memorySizeOf(request.body)) > 0) {
      console.log(this.formatByteSize(this.memorySizeOf(request.body)))
    }
    // if (this.sizeMiB(this.memorySizeOf(request.body)) > 2) {
    //   Swal.fire({
    //     position: 'center',
    //     icon: 'info',
    //     title: 'Por favor, diminua o tamanho das imagens/fotos!',
    //     showConfirmButton: true
    //   });
    //   this.loading.emitChange(false);
    //   throw -1;
    // } else {
      return next.handle(request);
    // }
  }

  private memorySizeOf(obj: any) {
    var bytes = 0;

    function sizeOf(obj: any) {
      if (obj !== null && obj !== undefined) {
        switch (typeof obj) {
          case 'number':
            bytes += 8;
            break;
          case 'string':
            bytes += obj.length * 2;
            break;
          case 'boolean':
            bytes += 4;
            break;
          case 'object':
            var objClass = Object.prototype.toString.call(obj).slice(8, -1);
            if (objClass === 'Object' || objClass === 'Array') {
              for (var key in obj) {
                if (!obj.hasOwnProperty(key)) continue;
                sizeOf(obj[key]);
              }
            } else bytes += obj.toString().length * 2;
            break;
        }
      }
      return bytes;
    };

    return sizeOf(obj);
  };

  private formatByteSize(bytes: any) {
    if (bytes < 1024) return bytes + " bytes";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(3) + " KiB";
    else if (bytes < 1073741824) return (bytes / 1048576).toFixed(3) + " MiB";
    else return (bytes / 1073741824).toFixed(3) + " GB";
  };

  private sizeMiB(bytes: any) {
    if (bytes < 1073741824) return Number((bytes / 1048576).toFixed(3));
  };

}
