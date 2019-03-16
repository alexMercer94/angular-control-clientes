import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente } from 'src/app/models/cliente.model';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];

  constructor(private clietesService: ClienteService) { }

  ngOnInit() {
    // Subscribirse para obtener cada uno de los clientes
    this.clietesService.getClientes().subscribe(
      clientes => {
        this.clientes = clientes;
      }
    );
  }

  // Obtener el saldo total de los clientes
  getSaldoTotal() {
    let saldoTotal = 0;
    if (this.clientes) {
      this.clientes.forEach( cliente => {
        saldoTotal += cliente.saldo;
      });
    }

    return saldoTotal;
  }

}
