import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Consulta } from 'src/app/model/Consulta';

@Component({
  selector: 'app-edit-consulta',
  templateUrl: './edit-consulta.component.html',
  styleUrls: ['./edit-consulta.component.css']
})
export class EditConsultaComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EditConsultaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Consulta
  ) {}
  ngOnInit(): void {
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addConsulta(consulta: Consulta) {
    console.log('consulta adicionado');
  }
}

