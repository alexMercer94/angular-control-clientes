import { Injectable } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Configuracion } from '../models/configuracion.model';
import { Observable } from 'rxjs';
import { throwIfEmpty } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService {

  configuracionDoc: AngularFirestoreDocument<Configuracion>;
  configuracion: Observable<Configuracion>;

  // El unico id de esta collecion es 1
  id = '1';

  constructor(
    private db: AngularFirestore
  ) { }

  // Obtener el valor de la collecion que se quiere obtener
  getConfiguracion(): Observable<Configuracion> {
    this.configuracionDoc = this.db.doc<Configuracion>(`configuracion/${this.id}`);
    this.configuracion = this.configuracionDoc.valueChanges();
    return this.configuracion;
  }

  // Modificar el objeto de tipo configuracion
  modificarConfiguracion(configuracion: Configuracion) {
    this.configuracionDoc = this.db.doc<Configuracion>(`configuracion/${this.id}`);
    this.configuracionDoc.update(configuracion);
  }
}
