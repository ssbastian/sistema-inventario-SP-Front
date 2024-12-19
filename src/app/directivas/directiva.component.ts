import { Component } from '@angular/core';

@Component({
  selector: 'app-directivas',
  imports: [],
  templateUrl: './directiva.component.html',
  styleUrl: './directiva.component.css'
})
export class DirectivaComponent {
    //no lo uso
/*   cls: Cliente[]=[
    {id: 1, nombre: 'Juan', apellido: 'Perez', email: 'Juan@unicauca.edu.co', createAt: '2021-05-14'},
    {id: 2, nombre: 'Sebas', apellido: 'Sangez', email: 'san@unicauca.edu.co', createAt: '2022-05-14'}
  ] */

    Directiva: String[] = [
      '1', '2', '3'
    ]
}
