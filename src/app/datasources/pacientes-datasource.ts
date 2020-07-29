import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Paciente } from "../model/Paciente";
import { Observable } from "rxjs";

export class PacientesDataSource implements DataSource<Paciente> {
    connect(collectionViewer: CollectionViewer): Observable<Paciente[] | readonly Paciente[]> {
        throw new Error("Method not implemented.");
    }
    disconnect(collectionViewer: CollectionViewer): void {
        throw new Error("Method not implemented.");
    }

}