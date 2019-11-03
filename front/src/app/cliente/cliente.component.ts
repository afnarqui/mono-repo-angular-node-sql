import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../service/cliente/cliente.service';
import { FormGroup, FormBuilder } from '@angular/forms';

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
  angForm: FormGroup;
  constructor(private fb: FormBuilder, private service: ClienteService) {
    this.createForm();
   }

  createForm() {
    this.angForm = this.fb.group({
      email: [''],
      nombre: ['']
    });
  }

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

  guardar(email:any,nombre:any){
    debugger
    if(email==='' || nombre===''){
      alert('Los valores son requeridos verifique..');
      return
    }
    let datos = {
      email,
      nombre
    }

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
