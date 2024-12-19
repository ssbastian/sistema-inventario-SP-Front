import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  /* public proyecto: any = {anio: '2024', nombreProyecto: 'Proyecto de introduccion a Angular'}; */
  public tecnologia: any = {leyenda: 'webApp desarrollada con ', tec1: 'Angular19', tec2: 'Spring'};
  public autor: string = 'J Sebastian S...';
  public proyecto: any = {anio: '2024', nombreProyecto: 'Angular'};
}
