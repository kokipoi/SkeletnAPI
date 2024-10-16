import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  // Opciones HTTP
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };

  // URL base de la API
  apiURL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  // Método GET
  getItems(): Observable<any> {
    return this.http.get(`${this.apiURL}/cliente`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  // Método POST para agregar un nuevo cliente
  addItem(item: any): Observable<any> {
    return this.http.post(`${this.apiURL}/cliente`, item, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  // Método PUT para actualizar un cliente existente
  updateItem(id: number, item: any): Observable<any> {
    return this.http.put(`${this.apiURL}/cliente/${id}`, item, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  // Método DELETE para eliminar un cliente
  deleteItem(id: number): Observable<any> {
    return this.http.delete(`${this.apiURL}/cliente/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  // Método para manejar errores
  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}