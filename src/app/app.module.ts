import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PacienteComponent } from './components/paciente/paciente.component';
import { HeaderComponent } from './layout/header/header.component';
import { AddPacienteComponent } from './components/add-paciente/add-paciente.component';
import { PacienteService } from './services/paciente.service';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';
import { ConsultaComponent } from './components/consulta/consulta.component';
import { AddConsultaComponent } from './components/add-consulta/add-consulta.component'
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule, NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
import { HttpErrorInterceptor } from './error-handling/HttpErrorInterceptor';
import { ErrorDialogComponent } from './error-handling/error-dialog/error-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    PacienteComponent,
    HeaderComponent,
    AddPacienteComponent,
    ConsultaComponent,
    AddConsultaComponent,
    ErrorDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule
  ],
  providers: [
    PacienteService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ],
  entryComponents: [
    ErrorDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
