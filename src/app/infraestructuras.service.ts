import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { infra } from './model/infra';

@Injectable({
  providedIn: 'root'
})
export class InfraestructurasService {
  url='http://localhost:8080/infraestructura-salud/';

  constructor(private http: HttpClient) {}

  recuperarTodos() {
    return this.http.get<infra[]>(`${this.url}recuperartodos.php`);
  }

  alta(infraestructura: infra) {
    return this.http.post<infra>(`${this.url}alta.php`, JSON.stringify(infraestructura));    
  }

  baja(codigo: number) {
    return this.http.get(`${this.url}baja.php?codigo=${codigo}`);
  }

  seleccionar(codigo: number) {
    return this.http.get<infra[]>(`${this.url}seleccionar.php?codigo=${codigo}`);
  }

  modificacion(infraestructura: infra) {
    return this.http.post<infra>(`${this.url}modificacion.php`, JSON.stringify(infraestructura));    
  }
}
