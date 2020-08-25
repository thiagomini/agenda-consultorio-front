import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { PacienteService } from '../../services/paciente.service';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-paciente',
  templateUrl: './add-paciente.component.html',
  styleUrls: ['./add-paciente.component.css'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ]
})
export class AddPacienteComponent implements OnInit {
  @Output() addPaciente: EventEmitter<any> = new EventEmitter();

  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    nome: new FormControl('', Validators.required),
    dataDeNascimento: new FormControl('', Validators.required),
  });

  constructor(public service: PacienteService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const paciente = {
      nome: this.form.get('nome').value,
      dataDeNascimento: this.form.get('dataDeNascimento').value
    };
    this.addPaciente.emit(paciente);
    this.initializeFormGroup();
  }

  initializeFormGroup() {
    this.form.setValue({
      id: null,
      nome: '',
      dataDeNascimento: ''
    });
  }


}
