import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfiguracionService } from 'src/app/services/configuracion.service';
import { Configuracion } from 'src/app/models/configuracion.model';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {

  permitirRegsitro = false;

  constructor(
    private router: Router,
    private configuracionService: ConfiguracionService
  ) { }

  ngOnInit() {
    // Recuperar el valor de la variable obtenerRegistro desde la bd
    this.configuracionService.getConfiguracion().subscribe(
      (configuracion: Configuracion) => {
        this.permitirRegsitro = configuracion.permitirRegistro;
      }
    );
  }

  guardar() {
    const configuracion = {permitirRegistro: this.permitirRegsitro};
    this.configuracionService.modificarConfiguracion(configuracion);
    this.router.navigate(['/']);
  }

}
