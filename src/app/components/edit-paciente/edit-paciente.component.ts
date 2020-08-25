import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PacienteService } from 'src/app/services/paciente.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { Paciente } from 'src/app/model/Paciente';

@Component({
  selector: 'app-edit-paciente',
  templateUrl: './edit-paciente.component.html',
  styleUrls: ['./edit-paciente.component.css']
})
export class EditPacienteComponent implements OnInit {
  
  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    nome: new FormControl('', Validators.required),
    dataDeNascimento: new FormControl('', Validators.required),
  });

  constructor(
    private pacienteService: PacienteService,
    public confirmDialog: MatDialog,
    public dialogRef: MatDialogRef<EditPacienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Paciente) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form.setValue({
      id: this.data.id,
      nome: this.data.nome,
      dataDeNascimento: this.data.dataDeNascimento
    });
  }

  onSubmit() {
    const paciente = {
      id: this.form.get('id').value,
      nome: this.form.get('nome').value,
      dataDeNascimento: this.form.get('dataDeNascimento').value,
    };
    this.pacienteService.editPaciente(paciente).subscribe(paciente => {
      this.openDialog();
      this.dialogRef.close();
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  openDialog() {
    const dialogRef = this.confirmDialog.open(ConfirmationDialogComponent, {
      width: '330px',
      data: {
        title: 'Paciente editado com sucesso!'
      }

    }) 

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
