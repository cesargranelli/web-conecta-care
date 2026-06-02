import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';

export const sizeBodyInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  if (req.body) {
    const size = memorySizeOf(req.body);
    if (size > 0) {
      console.log(formatByteSize(size));
    }
  }
  return next(req);
};

function memorySizeOf(obj: any): number {
  let bytes = 0;
  function sizeOf(obj: any) {
    if (obj !== null && obj !== undefined) {
      switch (typeof obj) {
        case 'number': bytes += 8; break;
        case 'string': bytes += obj.length * 2; break;
        case 'boolean': bytes += 4; break;
        case 'object':
          const objClass = Object.prototype.toString.call(obj).slice(8, -1);
          if (objClass === 'Object' || objClass === 'Array') {
            for (const key in obj) {
              if (!obj.hasOwnProperty(key)) continue;
              sizeOf(obj[key]);
            }
          } else { bytes += obj.toString().length * 2; }
          break;
      }
    }
    return bytes;
  }
  return sizeOf(obj);
}

function formatByteSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' bytes';
  if (bytes < 1048576) return (bytes / 1024).toFixed(3) + ' KiB';
  if (bytes < 1073741824) return (bytes / 1048576).toFixed(3) + ' MiB';
  return (bytes / 1073741824).toFixed(3) + ' GB';
}
