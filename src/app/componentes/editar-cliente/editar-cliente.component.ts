import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {

  cliente: Cliente = {
    nombre: '',
    apellido: '',
    email: '',
    saldo: 0
  };

  id: string;


  constructor(private clietesService: ClienteService,
              private flashMessages: FlashMessagesService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    // Obtener el id que proporciona el url
    this.id = this.route.snapshot.params[`id`];
    // Llamar al servicio para obtener cliente pasando el id
    // Hay que subscribirse al metodo
    this.clietesService.getCliente(this.id).subscribe(cliente => {
      // Inicializar el atributo de cliente de esta clase con
      // el cliente que se recibe como argumento
      this.cliente = cliente;
    });
  }

  guardar({value, valid}: {value: Cliente, valid: boolean}) {
    if (!valid) {
      // Mostrar mensaje de erroe en caso de que no sea valido
      this.flashMessages.show('Por favor llena el formulario correctamento', {
        cssClass: 'alert-danger',
        timeout: 4000
      });
    } else {
      value.id = this.id;
      // Modificar el cliente a traves del servicio
      this.clietesService.modificarCliente(value);
      this.router.navigate(['/']);
    }
  }

  eliminar() {
    if (confirm('Seguro que desea eliminar el cliente?')) {
      this.clietesService.eliminarCliente(this.cliente);
      this.router.navigate(['/']);
    }
  }

}
