import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WCheckTokenService {

  constructor(private router: Router) { 
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        this.handleRouteChange();
      }
    });
  }

  private handleRouteChange() {
    // Coloca aquí la lógica que deseas ejecutar cuando cambie la ruta
    // console.log('La ruta ha cambiado');
  }
}