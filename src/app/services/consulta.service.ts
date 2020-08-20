import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Consulta } from '../model/Consulta';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  consultasUrl: string = 'https://localhost:5001/api/appointments'

  constructor(private http: HttpClient) { }

  getConsultas(): Observable<Consulta[]> {
    return this.http.get<Consulta[]>(this.consultasUrl, httpOptions);
  }

  deleteConsulta(consulta: Consulta): Observable<any> {
    const url = `${this.consultasUrl}/${consulta.id}`
    return this.http.delete<Consulta>(url, httpOptions);
  }

  editConsulta(consulta: Consulta): Observable<Consulta> {
    const url = `${this.consultasUrl}/${consulta.id}`;
    return this.http.put<Consulta>(url, consulta, httpOptions);
  }

  addConsulta(consulta: Consulta): Observable<Consulta> {
    return this.http.post<Consulta>(this.consultasUrl, consulta, httpOptions)
  }

}
