import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../service/cliente/cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css'],
  providers: [ClienteService],
})
export class ClienteComponent implements OnInit {

  datos:any = {
    nombre:null,
    email:null,
  }

  data: any = [];
  constructor(private service: ClienteService) { }

  ngOnInit() {
    this.get();
  }

  get(){
    let data = this.service.get()
    data.subscribe((items)=>{
      this.data = items
      console.log(items)

    },(error)=>{
      console.log(error)
    })
  }

  guardar(datos:any){
    let data = this.service.guardar(datos)
    data.subscribe((items)=>{
      this.get();
      let datos = {
        from:'sistemas@sistemas.co',
        to:items[0].email,
        text:items[0].nombre,
        html:'',
        filename:'',
        content:'',
        subject:'Bienvenido a nuestro equipo',
        nombre:items[0].nombre,
        puntos:items[0].puntosAcumulados ===null ? 0 :items[0].puntosAcumulados,
      }
      this.service.correo(datos)
      .subscribe((items)=>{
        console.log('correo enviado')
      })
    })
  }
}
