import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Consulta } from 'src/app/model/Consulta';
import { Paciente } from 'src/app/model/Paciente';
import { ThemePalette } from '@angular/material/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConsultaService } from 'src/app/services/consulta.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

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
    public confirmDialog: MatDialog,
    public dialogRef: MatDialogRef<EditConsultaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { consulta: Consulta, pacientes: Array<Paciente> }
  ) {}
  ngOnInit(): void {
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
    this.consultaService.editConsulta(consulta).subscribe(consulta => {
      this.openDialog();
      this.dialogRef.close();
    });
    
  }

  initForm(): void {
    this.form.setValue({
      id: this.data.consulta.id,
      horaConsultaInicio: this.data.consulta.horaConsultaInicio,
      horaConsultaFim: this.data.consulta.horaConsultaFim,
      observacao: this.data.consulta.observacao,
      paciente: this.data.consulta.person
    });
  }

  openDialog() {
    const dialogRef = this.confirmDialog.open(ConfirmationDialogComponent, {
      width: '330px',
      data: {
        title: 'Consulta editada com sucesso!'
      }

    }) 

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
