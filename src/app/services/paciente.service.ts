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

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    nome: new FormControl('', Validators.required),
    dataDeNascimento: new FormControl('', Validators.required),
  });

  constructor(private http: HttpClient) { }

  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      nome: '',
      dataDeNascimento: ''
    });
  }

  getPacientes(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(this.pacientesUrl, httpOptions);
  }

  deletePaciente(paciente: Paciente): Observable<any> {
    const url = `${this.pacientesUrl}/${paciente.id}`
    return this.http.delete<Paciente>(url, httpOptions);
  }

  addPaciente(paciente: Paciente): Observable<Paciente> {
    return this.http.post<Paciente>(this.pacientesUrl, paciente, httpOptions);
  }
}
