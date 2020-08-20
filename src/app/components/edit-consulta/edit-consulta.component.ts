import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Consulta } from 'src/app/model/Consulta';
import { Paciente } from 'src/app/model/Paciente';
import { ThemePalette } from '@angular/material/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConsultaService } from 'src/app/services/consulta.service';

@Component({
  selector: 'app-edit-consulta',
  templateUrl: './edit-consulta.component.html',
  styleUrls: ['./edit-consulta.component.css']
})
export class EditConsultaComponent implements OnInit {
  @Output() editConsulta: EventEmitter<any> = new EventEmitter();

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
  
  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    horaConsultaInicio: new FormControl('', Validators.required),
    horaConsultaFim: new FormControl('', Validators.required),
    paciente: new FormControl(0),
    observacao: new FormControl('')
  });
  
  
  constructor(
    private consultaService: ConsultaService,
    public dialogRef: MatDialogRef<EditConsultaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { consulta: Consulta, pacientes: Array<Paciente> }
  ) {}
  ngOnInit(): void {
    console.log('oi')
    this.initForm();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    const consulta = {
      id: this.data.consulta.id,
      horaConsultaInicio: this.form.get('horaConsultaInicio').value,
      horaConsultaFim: this.form.get('horaConsultaFim').value,
      personId: this.data.consulta.personId,
      observacao: this.form.get('observacao').value,
      person: null
    };
    console.log(consulta);
    this.consultaService.editConsulta(consulta).subscribe(consulta => {
      alert('Consulta editada com sucesso!');
      this.dialogRef.close();;
    });
    
  }

  initForm(): void {
    this.form.get('id').setValue(this.data.consulta.id);
    this.form.get('horaConsultaInicio').setValue(this.data.consulta.horaConsultaInicio);
    this.form.get('horaConsultaFim').setValue(this.data.consulta.horaConsultaFim);
    this.form.get('observacao').setValue(this.data.consulta.observacao);
    this.form.get('paciente').setValue(this.data.consulta.person);
  }
}

