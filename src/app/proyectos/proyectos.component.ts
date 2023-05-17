import { Component, OnInit, OnDestroy } from '@angular/core';
import { latLng, tileLayer, marker, Map, LeafletMouseEvent } from 'leaflet';
import * as L from 'leaflet';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit, OnDestroy {
  latitud: number = 0;
  longitud: number = 0;
  map: Map | undefined;
  mostrarFormulario: boolean = false;
  descripcion: string = '';
  mostrarCoordenadas: boolean = false;

  ngOnInit() {
    this.initMap();
  }

  ngOnDestroy() {
    if (this.map) {
      this.map.off('mousemove');
      this.map.off('mouseover');
      this.map.off('mouseout');
    }
  }

  initMap() {
    const mapElement: HTMLElement | null = document.getElementById('map');
    
    this.map = new Map(mapElement as HTMLElement).setView([1.2, -77.27], 15);

    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    const marker1 = marker([1.2, -77.27]).addTo(this.map);
    const marker2 = marker([1.2, -77.278]).addTo(this.map);
    marker1.bindPopup('Marcador 1');
    marker2.bindPopup('Marcador 2');

    this.map.on('mousemove', (event: LeafletMouseEvent) => {
      this.latitud = event.latlng.lat;
      this.longitud = event.latlng.lng;
    });

    this.map.on('mouseover', () => {
      this.mostrarCoordenadas = true;
      const { latitud, longitud } = this;
      if (this.map) {
        L.tooltip({ permanent: true, direction: 'top' })
          .setContent(`Latitud: ${latitud} - Longitud: ${longitud}`)
          .setLatLng([latitud, longitud])
          .openOn(this.map);
      }
    });

    this.map.on('mouseout', () => {
      this.mostrarCoordenadas = false;
      if (this.map) {
        this.map.closeTooltip();
      }
    });
  }

  agregarMarcador() {
    if (this.map) {
      const nuevaCoordenada = latLng(this.latitud, this.longitud);
      const nuevoMarcador = marker(nuevaCoordenada).addTo(this.map);
      nuevoMarcador.bindPopup(this.descripcion);
      this.latitud = 0;
      this.longitud = 0;
      this.mostrarFormulario = false;
    }
  }

  mostrarOcultarFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
  }
}
