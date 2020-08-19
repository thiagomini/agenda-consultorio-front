import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    horaConsultaInicio: new FormControl('', Validators.required),
    horaConsultaFim: new FormControl('', Validators.required),
    paciente: new FormControl(0),
    observacao: new FormControl('')
  });

  constructor(private http: HttpClient) { }

  getConsultas(): Observable<Consulta[]> {
    return this.http.get<Consulta[]>(this.consultasUrl, httpOptions);
  }

  deleteConsulta(consulta: Consulta): Observable<any> {
    const url = `${this.consultasUrl}/${consulta.id}`
    return this.http.delete<Consulta>(url, httpOptions);
  }

  editConsulta(consulta: Consulta): Observable<Consulta> {
    const url = `{this.consultasUrl}/${consulta.id}`;
    return this.http.put<Consulta>(url, httpOptions);
  }

  addConsulta(consulta: Consulta): Observable<Consulta> {
    return this.http.post<Consulta>(this.consultasUrl, consulta, httpOptions)
  }

}
