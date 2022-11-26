import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export function swallowErrors<T>(): (source: Observable<T>) => Observable<T> {
  return (source) =>
    source.pipe(
      catchError((err: any) => {
        console.log('Error: ', err);
        return of({
          errorMessage:
            err?.error?.error_description ||
            err?.error?.exceptionMessage ||
            err?.error?.message ||
            null,
          status: err.status,
          ok: err.ok
        }) as Observable<any>;
      })
    );
}
