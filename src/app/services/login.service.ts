import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private authService: AngularFireAuth) { }

  login(email: string, password: string) {
      // AngularFireAuth regresa una promesa
      return new Promise((resolve, reject) => {
        this.authService.auth.signInWithEmailAndPassword(email, password)
        .then(datos => resolve(datos),
            error => reject(error)
        );
      });
  }

  // Recuperar el usuario autenticado en la bd
  getAuth() {
    return this.authService.authState.pipe(
      map(auth => auth)
    );
  }

  // Cerrar la sesion de un usuario
  logout() {
    this.authService.auth.signOut();
  }
}
