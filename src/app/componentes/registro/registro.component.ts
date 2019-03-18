import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  email: string;
  password: string;

  constructor(
    private router: Router,
    private flashMessaged: FlashMessagesService,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    // Revisar si un usuario ya esta autenticado
    this.loginService.getAuth().subscribe(auth => {
      if (auth) {
        this.router.navigate(['/']);
      }
    });
  }

  registro() {
    this.loginService.registrarse(this.email, this.email)
    .then(res => { // Si se registro correctamento se redirige a la pagina de inicio
      this.router.navigate(['/']);
    })
    .catch(error => { // En caso de error al registrar se muestra mensaje de error
      this.flashMessaged.show(error, {
        cssClass: 'alert-danger',
        timeout: 4000
      });
    });
  }

}
