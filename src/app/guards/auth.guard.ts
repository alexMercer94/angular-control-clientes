import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Este guard comprobara si un usuario ya esta logeado y si no
// lo redigira a la pagina de login
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private afAuth: AngularFireAuth
    ) {}

    canActivate(): Observable<boolean> {
        return this.afAuth.authState.pipe(map(auth => {
            if (!auth) {
                // En caso de no que un usuario no este logeado
                // se regresa false para evitar que no se muestre la pagina
                // que esta solicitando el usuario
                this.router.navigate(['/login']);
                return false;
            } else {
                // Si hay alguien logeado
                // Se muestra la pagina que esta solicitando el usuario
                return true;
            }
        }));
    }
}
