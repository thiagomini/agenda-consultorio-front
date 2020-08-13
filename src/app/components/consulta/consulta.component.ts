import { Component, OnInit } from '@angular/core';
import { Consulta } from '../../model/Consulta';
import { MatTableDataSource } from '@angular/material/table';
import { ConsultaService } from 'src/app/services/consulta.service';
import { PacienteService } from 'src/app/services/paciente.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {

  consultas: MatTableDataSource<Consulta>;
  columnsToDisplay: string[] = ['horaInicio', 'horaFim', 'paciente', 'observacao', 'editar', 'excluir'];

  constructor(private consultaService: ConsultaService, private pacienteService: PacienteService) { }

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
    console.log(`Consulta editado: ${consulta}`);
  }

  onRowClicked(row) {
    console.log(row);
  }


}
