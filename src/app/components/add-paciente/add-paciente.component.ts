import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { PacienteService } from '../../services/paciente.service';
import { MAT_DATE_LOCALE } from '@angular/material/core';

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

  nome: string;
  dataDeNascimento: Date;

  constructor(public service: PacienteService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const paciente = {
      nome: this.nome,
      dataDeNascimento: this.dataDeNascimento
    };
    console.log(`submitted: nome: ${paciente.nome} nascimento: ${paciente.dataDeNascimento}`);
    this.addPaciente.emit(paciente);
  }


}
