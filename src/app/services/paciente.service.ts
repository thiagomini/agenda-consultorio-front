import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paciente } from '../model/Paciente';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  pacientesUrl: string = 'https://localhost:5001/api/people'

  constructor(private http: HttpClient) { }

  getPacientes(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(this.pacientesUrl, httpOptions);
  }

  getPaciente(id: number): Observable<Paciente> {
    return this.http.get<Paciente>(`${this.pacientesUrl}/${id}`, httpOptions);
  }

  deletePaciente(paciente: Paciente): Observable<any> {
    const url = `${this.pacientesUrl}/${paciente.id}`
    return this.http.delete<Paciente>(url, httpOptions);
  }

  addPaciente(paciente: Paciente): Observable<Paciente> {
    return this.http.post<Paciente>(this.pacientesUrl, paciente, httpOptions);
  }

  editPaciente(paciente: Paciente): Observable<Paciente> {
    const url = `${this.pacientesUrl}/${paciente.id}`;
    return this.http.put<Paciente>(url, paciente, httpOptions);
  }
}
