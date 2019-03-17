import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente } from 'src/app/models/cliente.model';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];
  cliente: Cliente = {
    nombre: '',
    apellido: '',
    email: '',
    saldo: 0
  };

  @ViewChild('closeBtn') closeBtn: ElementRef;

  constructor(private clietesService: ClienteService,
              private flashMessages: FlashMessagesService) { }

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

  agregar({value, valid}: {value: Cliente, valid: boolean}) {
    if (!valid) {
      this.flashMessages.show('Por favor llena el formulario correctamente', {
        cssClass: 'alert-danger',
        timeout: 4000
      });
    } else {
      // Add new client
      this.clietesService.agregarCliente(value);
      this.closeModal();
    }
  }

  // Close modal
  private closeModal(): void {
    this.closeBtn.nativeElement.click();
  }
}
