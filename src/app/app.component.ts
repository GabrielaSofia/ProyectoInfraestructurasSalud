import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { InfraestructurasService } from './infraestructuras.service';
import { infra } from './model/infra';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  infraestructuras!:any;
  dtOptions: DataTables.Settings ={};
  dtTrigger: Subject<any> = new Subject<any>();
  datos:infra = new infra();

  constructor(private infraestructurasServicio: InfraestructurasService){
  }
  
  ngOnInit(){
    this.recuperarTodos();
  }


  recuperarTodos() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      destroy:true
    };
    this.infraestructurasServicio.recuperarTodos().subscribe(
      result =>{
        this.infraestructuras = result;
        this.dtTrigger.next()}
    );
  }
  
  alta() {
    this.infraestructurasServicio.alta(this.datos).subscribe(datos => {
      //if (datos['resultado']=='OK') {
        //alert(datos['mensaje']);
        this.recuperarTodos();
      //}
    });
  }
  
  baja(codigo: number) {
    Swal.fire({
      title: '¿Está seguro?',
      text: "No podrá revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Eliminado!',
          'Tu archivo ha sido eliminado',
          'success'
        )
        this.infraestructurasServicio.baja(codigo).subscribe(datos => {
        //if (datos['resultado']=='OK') {
        //alert(datos['mensaje']);
          this.recuperarTodos();
        //}
        });
      }
    })
    
  }

  seleccionar(codigo: number) {
    this.infraestructurasServicio.seleccionar(codigo).subscribe(
      result => { console.log(result);
        this.datos= result[0];
      } );
  }

  modificacion() {
    const datos = {
      codigo:this.datos.codigo,
      numero:this.datos.numero,
      tipo:this.datos.tipo,
      nombre:this.datos.nombre,
      direccion:this.datos.direccion,
      coordenadas:this.datos.coordenadas,
    };
    this.infraestructurasServicio.modificacion(datos).subscribe(datos => {
      //if (datos['resultado']=='OK') {
        //alert(datos['mensaje']);
        console.log(datos);
        console.log(this.datos)
        this.recuperarTodos();
      //}
    },(error)=>{
      console.log(error);
    }
    );    
  }

 hayRegistros(){
    return true;
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
    if (this.dtOptions) {
      this.dtOptions.destroy;
    }
  }

}
