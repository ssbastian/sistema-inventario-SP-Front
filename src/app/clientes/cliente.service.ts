//Uso este servicio para desacoplar la logica de obtener clientes de Clientes.ts
import { Injectable } from '@angular/core';
//decorador injectable para crear automaticamente un objeto de la clase
import { Cliente } from './cliente';
import { CLIENTES } from './clientes.json';

import { catchError, Observable, of, throwError } from 'rxjs'; // patron observador

//import para que consuma el API REST
import { HttpClient, HttpHeaders } from '@angular/common/http';
import swal from 'sweetalert2';
import { Region } from './Region';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private urlEndPoint: string = 'http://localhost:8085/api/clientes';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' }); //indicarle al servidor qeu nos deve devolfer un json

  constructor(private http: HttpClient) {}

  /*   getClientes(): Observable<Cliente[]> {
    return of(CLIENTES);
  } */

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.urlEndPoint);
  }

  getClienteId(id : number) : Observable<Cliente>{
    const url = `${this.urlEndPoint}/${id}`; // Aquí usamos la URL dinámica
    return this.http.get<Cliente>(url, { headers: this.httpHeaders })
  }


  /*     create(cliente: Cliente) : Observable<Cliente> {
      return this.http.post<Cliente>(this.urlEndPoint,cliente, {headers: this.httpHeaders})
      return this.http.delete<Cliente>(this.urlEndPoint, 1 )
      
    } */

  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.urlEndPoint, cliente, { headers: this.httpHeaders })
      .pipe(
        catchError((e) => {
          if (e.status == 400) {
            return throwError(e);
          }
          console.log(e.error.mensaje);
          swal.fire('Error al crear el cliente', e.error.mensaje, 'error');
          return throwError(e);
        })
      );
  }

  delete(id: number): Observable<Cliente[]> {
    const url = `${this.urlEndPoint}/${id}`; // Aquí usamos la URL dinámica
    return this.http.delete<Cliente[]>(url, { headers: this.httpHeaders })  // Usamos 'any' si no estás seguro del tipo de respuesta
    .pipe(
      catchError((e) => {
        if (e.status == 400) {
          return throwError(e);
        }
        console.log(e.error.mensaje);
        swal.fire('Error al eliminar el cliente', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }


  editar(cliente: Cliente) {
    const url = `${this.urlEndPoint}/${cliente.id}`; // Aquí usamos la URL dinámica
    return this.http.put<Cliente>(url, cliente, {headers: this.httpHeaders });
  }

  getRegiones(): Observable<Region[]> {
    return this.http.get<Region[]>(this.urlEndPoint + '/regiones');
  }

  
}
