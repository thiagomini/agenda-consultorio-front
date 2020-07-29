import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    nome: new FormControl('', Validators.required),
    dataNascimento: new FormControl('', Validators.required),
  });

  constructor() { }

  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      nome: '',
      dataNascimento: ''
    });
  }
}
