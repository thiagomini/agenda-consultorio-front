import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
