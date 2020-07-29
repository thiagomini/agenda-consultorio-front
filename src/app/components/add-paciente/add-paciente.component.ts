import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { PacienteService } from '../../services/paciente.service';

@Component({
  selector: 'app-add-paciente',
  templateUrl: './add-paciente.component.html',
  styleUrls: ['./add-paciente.component.css']
})
export class AddPacienteComponent implements OnInit {
  @Output() addPaciente: EventEmitter<any> = new EventEmitter();

  nome: string;
  dataNascimento: Date;

  constructor(public service: PacienteService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const paciente = {
      nome: this.nome,
      dataNascimento: this.dataNascimento
    };
    console.log(`submitted: nome: ${paciente.nome} nascimento: ${paciente.dataNascimento}`);
    this.addPaciente.emit(paciente);
  }


}
