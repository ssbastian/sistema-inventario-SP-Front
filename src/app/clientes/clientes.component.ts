import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { CommonModule } from '@angular/common';
import { ClienteService } from './cliente.service';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  imports: [CommonModule],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css',
})
export class ClientesComponent implements OnInit {
  //no lo uso
  /*   cls: Cliente[]=[
    {id: 1, nombre: 'Juan', apellido: 'Perez', email: 'Juan@unicauca.edu.co', createAt: '2021-05-14'},
    {id: 2, nombre: 'Sebas', apellido: 'Sangez', email: 'san@unicauca.edu.co', createAt: '2022-05-14'}
  ] */
 


  clientes: Cliente[] = [];

  constructor(private objClienteService: ClienteService, private router: Router) {}

  eliminarCliente(id: number) {
    // Muestra un cuadro de confirmación antes de proceder con la eliminación
    swal.fire({
      title: '¿Estás seguro?',
      text: "¡Esta acción no se puede deshacer!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true // Cambia el orden de los botones
    }).then((result) => {
      if (result.isConfirmed) {
        // Si el usuario confirma, se procede a eliminar el cliente
        this.objClienteService.delete(id).subscribe(() => {
           this.clientes = this.clientes.filter(cliente => cliente.id !== id);
          swal.fire('Eliminado', 'El cliente ha sido eliminado', 'success');
        });
      } else {
        swal.fire('Cancelado', 'El cliente no fue eliminado', 'info');
      }
    });
  }

  editarCliente(id: number) {
   /*  cliente.nombre = 'test'
    cliente.apellido = 'hola'
    
    
    this.objClienteService.editar(cliente); */
    /* console.log("metodo editar"); */
    this.router.navigate(['/cliente/form',id]);
  }


  ngOnInit(): void {
    this.objClienteService
      .getClientes()
      .subscribe((clientes) => (this.clientes = clientes));
  }
}
