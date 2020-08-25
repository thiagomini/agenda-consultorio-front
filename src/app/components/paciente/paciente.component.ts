import { Component, OnInit } from '@angular/core';
import { Paciente } from '../../model/Paciente';
import { MatTableDataSource } from '@angular/material/table';
import { PacienteService } from 'src/app/services/paciente.service';
import { MatDialog } from '@angular/material/dialog';
import { EditPacienteComponent } from '../edit-paciente/edit-paciente.component';

@Component({
  selector: 'app-pacientes',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {

  pacientes: MatTableDataSource<Paciente>;
  columnsToDisplay: string[] = ['nome', 'dataDeNascimento', 'editar', 'excluir'];
  
  constructor(private pacienteService: PacienteService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.reloadPacientes();
  }

  reloadPacientes() {
    this.pacienteService.getPacientes().subscribe(pacientes => {
      console.log(pacientes);
      this.pacientes = new MatTableDataSource(pacientes);
    })
  }
  
  addPaciente(paciente: Paciente) {
    const allPacientes = this.pacientes.data;
    this.pacienteService.addPaciente(paciente).subscribe(response => {
      paciente.id = response.id;
      allPacientes.push(paciente);
      this.pacientes = new MatTableDataSource(allPacientes)
    })
  }

  deletePaciente(paciente: Paciente) {
    const allPacientes = this.pacientes.data.filter(p => p.id !== paciente.id);
    this.pacientes = new MatTableDataSource(allPacientes)
    this.pacienteService.deletePaciente(paciente).subscribe(response => {
      console.log(response)
    });
  }

  botaoExcluirClicado(paciente: Paciente) {
    this.deletePaciente(paciente);
  }

  botaoEditarClicado(paciente: Paciente) {
    this.openDialog(paciente);
  }

  onRowClicked(row) {
    console.log(row);
  }

  openDialog(paciente): void {
    const dialogRef = this.dialog.open(EditPacienteComponent, {
      width: "750px",
      data: paciente
    });

    dialogRef.afterClosed().subscribe(result => {
      this.reloadPacientes()
    });
  }

}
