import { throwError } from "rxjs";

export class ErrorHandler {
  /**
   *
   */
  constructor(error:any) {}
  static getError=()=>{
    let errorMessage = '';
    if(this.error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    // eslint-disable-next-line no-console
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
