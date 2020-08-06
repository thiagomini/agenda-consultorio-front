import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Paciente } from 'src/app/model/Paciente';
import { PacienteService } from '../../services/paciente.service';
import { ConsultaService } from '../../services/consulta.service';
import { MAT_DATE_LOCALE, ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-add-consulta',
  templateUrl: './add-consulta.component.html',
  styleUrls: ['./add-consulta.component.css'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ]
})
export class AddConsultaComponent implements OnInit {
  @Output() addConsulta: EventEmitter<any> = new EventEmitter();

  @Input() showSpinners: boolean = true;
  @Input() showSeconds: boolean = false;
  @Input() stepHour: number = 1;
  @Input() stepMinute: number = 5;
  @Input() touchUi: boolean = false;
  @Input() color: ThemePalette = undefined;
  @Input() enableMeridian: boolean = false;
  @Input() disableMinute: boolean = false;
  @Input() hideTime: boolean = false;
  

  horaConsultaInicio: Date;
  horaConsultaFim: Date;
  observacao: string;
  paciente: Paciente;
  pacientes: Paciente[];

  constructor(public pacienteService: PacienteService, public consultaService: ConsultaService) { }

  ngOnInit(): void {
    this.pacienteService.getPacientes().subscribe(pacientes => {
      this.pacientes = pacientes;
    })
  }

  onSubmit() {
    const consulta = {
      horaConsultaInicio: this.horaConsultaInicio,
      horaConsultaFim: this.horaConsultaFim,
      personId: this.paciente,
      observacao: this.observacao
    };
    this.addConsulta.emit(consulta);
  }

}
