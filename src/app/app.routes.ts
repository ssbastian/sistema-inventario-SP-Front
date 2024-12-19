import { Directive } from '@angular/core';
import { Routes } from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component';
import { DirectivaComponent } from './directivas/directiva.component';
import { FormComponent } from './clientes/form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/clientes', pathMatch: 'full' },
  { path: 'directivas', component: DirectivaComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: 'cliente/form', component: FormComponent },
  { path: 'cliente/form/:id', component: FormComponent },

  

 

];
