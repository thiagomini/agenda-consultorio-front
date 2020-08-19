import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Consulta } from 'src/app/model/Consulta';
import { ConsultaService } from 'src/app/services/consulta.service';
import { PacienteService } from 'src/app/services/paciente.service';
import { Paciente } from 'src/app/model/Paciente';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-edit-consulta',
  templateUrl: './edit-consulta.component.html',
  styleUrls: ['./edit-consulta.component.css']
})
export class EditConsultaComponent implements OnInit {

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
  
  constructor(
    public dialogRef: MatDialogRef<EditConsultaComponent>,
    public consultaService: ConsultaService,
    public pacienteService: PacienteService,
    @Inject(MAT_DIALOG_DATA) public data: { consulta: Consulta, pacientes: Array<Paciente> }
  ) {}
  ngOnInit(): void {
  
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  editConsulta(consulta: Consulta) {
    this.consultaService.editConsulta(consulta);
  }

  onSubmit() {
    const consulta = {
      id: this.data.consulta.id,
      horaConsultaInicio: this.data.consulta.horaConsultaInicio,
      horaConsultaFim: this.data.consulta.horaConsultaFim,
      personId: this.data.consulta.personId,
      observacao: this.data.consulta.observacao,
      person: null
    };
    this.editConsulta(consulta);
  }
}

