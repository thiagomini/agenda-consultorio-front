import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Paciente } from 'src/app/model/Paciente';
import { PacienteService } from '../../services/paciente.service';
import { ConsultaService } from '../../services/consulta.service';
import { MAT_DATE_LOCALE, ThemePalette } from '@angular/material/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
  @Input() stepMinute: number = 1;
  @Input() stepSecond: number = 5;
  @Input() touchUi: boolean = false;
  @Input() color: ThemePalette = undefined;
  @Input() enableMeridian: boolean = false;
  @Input() disableMinute: boolean = false;
  @Input() hideTime: boolean = false;
  @Input() defaultTime: Array<any> = [0, 0, 0]
  
  pacientes: Paciente[];

  constructor(public pacienteService: PacienteService, public consultaService: ConsultaService) { }

  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    horaConsultaInicio: new FormControl('', Validators.required),
    horaConsultaFim: new FormControl('', Validators.required),
    paciente: new FormControl(0),
    observacao: new FormControl('')
  });


  ngOnInit(): void {
    this.pacienteService.getPacientes().subscribe(pacientes => {
      this.pacientes = pacientes;
    })
  }

  onSubmit() {
    const consulta = {
      horaConsultaInicio: this.form.get('horaConsultaInicio').value,
      horaConsultaFim: this.form.get('horaConsultaFim').value,
      personId: this.form.get('id').value,
      observacao: this.form.get('observacao').value
    };
    this.addConsulta.emit(consulta);
    this.form.reset();
  }

}
