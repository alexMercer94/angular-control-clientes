import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { ConfiguracionService } from 'src/app/services/configuracion.service';

@Component({
  selector: 'app-cabecero',
  templateUrl: './cabecero.component.html',
  styleUrls: ['./cabecero.component.css']
})
export class CabeceroComponent implements OnInit {

  isLoggedIn: boolean;
  loggedInUser: string;
  permitirRegistro: boolean;

  constructor(private loginService: LoginService, private router: Router,
              private configuracionService: ConfiguracionService) { }

  ngOnInit() {
    // Saber si un usuario ya esta autenticado
    this.loginService.getAuth().subscribe(auth => {
      if (auth) {
        this.isLoggedIn = true;
        this.loggedInUser = auth.email;
      } else {
        this.isLoggedIn = false;
      }
    });

    // Asignar el valor de permitirRegsitro de la bd a la propiedad de esta clase
    this.configuracionService.getConfiguracion().subscribe(
      configuracion => {
        this.permitirRegistro = configuracion.permitirRegistro;
      }
    );
  }

  // Salir de la sesión
  logout() {
    this.loginService.logout();
    // Cambiar la bandera a false ya que ya no hay ninguna sesion
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }

}
