import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PacienteComponent } from './components/paciente/paciente.component';
import { ConsultaComponent } from './components/consulta/consulta.component';

const routes: Routes = [
  { path: '', component: PacienteComponent },
  { path: 'consultas', component: ConsultaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
