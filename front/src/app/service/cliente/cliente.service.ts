import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  url = environment.URL_SERVICIOS_LOCALES;
  //url = environment.URL_SERVICIOS_LOCAL;

  constructor(private http: HttpClient) { }

  get() {
    console.log(this.url)
    return this.http.get(`${this.url}clientes`)
  }

  guardar(clientes: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.url + 'clientes/', JSON.stringify(clientes), {headers})
  }

  correo(datos: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.url}correo?from=${datos.from}&to=${datos.to}&subject=${datos.subject}&text=${datos.text}&html=${datos.html}&filename=${datos.filename}&nombre=${datos.nombre}&puntos=${datos.puntos}`, {headers})
  }

  actualizar(clientes: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(`${this.url}/clientes/`, clientes, { headers });
  }
}
