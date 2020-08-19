import { Component, OnInit, Inject } from '@angular/core';
import { Consulta } from '../../model/Consulta';
import { MatTableDataSource } from '@angular/material/table';
import { ConsultaService } from 'src/app/services/consulta.service';
import { PacienteService } from 'src/app/services/paciente.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import {EditConsultaComponent } from '../edit-consulta/edit-consulta.component';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {

  consultas: MatTableDataSource<Consulta>;
  columnsToDisplay: string[] = ['horaConsultaInicio', 'horaConsultaFim', 'paciente', 'observacao', 'editar', 'excluir'];
  selectedConsulta: Consulta;
  constructor(private consultaService: ConsultaService, private pacienteService: PacienteService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.consultaService.getConsultas().subscribe(
      consultas => {
      this.consultas = new MatTableDataSource(consultas);
    })
  }
  addConsulta(consulta: Consulta) {
    const allConsultas = this.consultas.data;
    this.consultaService.addConsulta(consulta).subscribe(response => {
      consulta.id = response.id;
      this.pacienteService.getPaciente(response.personId).subscribe(paciente => {
        consulta.person = paciente;
        allConsultas.push(consulta);
        this.consultas = new MatTableDataSource(allConsultas)
      }, (err) => {
        console.log('Erro!')
        alert('Erro ao criar uma consulta!');
      })
    })
  }

  deleteConsulta(consulta: Consulta) {
    const allConsultas = this.consultas.data.filter(p => p.id !== consulta.id);
    this.consultas = new MatTableDataSource(allConsultas)
    this.consultaService.deleteConsulta(consulta).subscribe(response => {
      console.log(response)
    });
  }

  botaoExcluirClicado(consulta: Consulta) {
    this.deleteConsulta(consulta);
  }

  botaoEditarClicado(consulta: Consulta) {
    this.selectedConsulta = consulta;
    this.openDialog()
  }

  onRowClicked(row) {
    console.log(row);
  }

  openDialog(): void {
    this.pacienteService.getPacientes().subscribe(pacientes => {
      const dialogRef = this.dialog.open(EditConsultaComponent, {
        width: "750px",
        data: {
          consulta: this.selectedConsulta,
          pacientes
        }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log("The dialog was closed");
        this.selectedConsulta = null;
      });
    })
    
  }

}