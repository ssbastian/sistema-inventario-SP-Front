import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteService } from './cliente.service';
import swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { Region } from './Region';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  public cliente: Cliente = new Cliente();
  public titulo: string = 'Crear cliente';
  public tituloBoton: string = 'Crear Cliente';
  public errores: string[] = [];
  public regiones: Region[] = [];
  private idCliente: number = 0;

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Detectar si estamos en modo edición o creación
    this.route.paramMap.subscribe(params => {
      this.idCliente = Number(params.get('id'));
      if (this.idCliente) {
        this.titulo = 'Editar cliente';
        this.tituloBoton = 'Editar cliente';
        this.cargarCliente(this.idCliente);
      }
    });

    // Obtener las regiones al cargar el componente
    this.obtenerRegiones();
  }

  private obtenerRegiones(): void {
    this.clienteService.getRegiones().subscribe((regiones) => {
      this.regiones = regiones;
    });
  }

  public guardarCliente(): void {
    if (this.cliente.id) {
      this.editarCliente();
    } else {
      this.crearCliente();
    }
  }

  private crearCliente(): void {
    this.clienteService.create(this.cliente).subscribe(
      (response) => {
        this.router.navigate(['/clientes']);
        swal.fire('Nuevo cliente', `Cliente ${response.nombre} creado con éxito!`, 'success');
      },
      (error) => {
        this.errores = error.error.errors as string[];
        console.error('Código de error:', error.status);
        console.error('Detalles:', error.error.errors);
      }
    );
  }

  private editarCliente(): void {
    this.clienteService.editar(this.cliente).subscribe(
      () => {
        this.router.navigate(['/clientes']);
        swal.fire('Cliente editado', `Cliente ${this.cliente.nombre} actualizado con éxito!`, 'success');
      },
      (error) => {
        this.errores = error.error.errors as string[];
        console.error('Código de error:', error.status);
        console.error('Detalles:', error.error.errors);
      }
    );
  }

  private cargarCliente(id: number): void {
    this.clienteService.getClienteId(id).subscribe((cliente) => {
      this.cliente = cliente;
    });
  }

  compararRegion(o1: Region, o2: Region): boolean {
    return o1?.id === o2?.id;
  }
}
