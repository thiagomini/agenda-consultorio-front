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
  dataDeNascimento: Date;

  constructor(public service: PacienteService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const paciente = {
      nome: this.nome,
      dataDeNascimento: this.dataDeNascimento
    };
    this.addPaciente.emit(paciente);
  }


}
