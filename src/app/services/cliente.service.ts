import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Cliente } from '../models/cliente.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ClienteService {
    clientesColeccion: AngularFirestoreCollection<Cliente>;
    // Se define un documento de tipo cliente
    clienteDoc: AngularFirestoreDocument<Cliente>;
    // Varible que contendra los objetos de tipo cliente
    clientes: Observable<Cliente[]>;
    // Objeto de tipo cliente
    cliente: Observable<Cliente>;

    constructor(private db: AngularFirestore) {
        // Pedir la coleccion a la db
        // Ademas es posible pedir la coleccion ordenada
        // En este caso por nombre y de manera ascendente
        this.clientesColeccion = db.collection('clientes', ref => ref.orderBy('nombre', 'asc'));
    }

    /**
     * Obtener los clientes
     */
    getClientes(): Observable<Cliente[]> {
        // Acceder a cada uno de los objetos de la collecion
        this.clientes = this.clientesColeccion.snapshotChanges()
            // Haciendo una iteracion de los elementos por el metodo pipe()
            // en conjunto del metodo map()
            .pipe(map(camios => {
                return camios.map( accion => {
                    const data = accion.payload.doc.data() as Cliente;
                    data.id = accion.payload.doc.id;
                    return data;
                });
            }));
        return this.clientes;
    }
}
