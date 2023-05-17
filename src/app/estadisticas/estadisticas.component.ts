import { Component } from '@angular/core';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent {
  ventasPorMes = [
    { mes: 'Enero', cantidadInmuebles: 20, totalVenta: 40000000 },
    { mes: 'Febrero', cantidadInmuebles: 30, totalVenta: 80000000 },
    { mes: 'Marzo', cantidadInmuebles: 30, totalVenta: 90000000 },
    { mes: 'Abril', cantidadInmuebles: 50, totalVenta: 110000000 },
  ];
  columnas: string[] = ['mes', 'cantidadInmuebles', 'totalVenta'];
}
