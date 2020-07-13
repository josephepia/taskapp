import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.page.html',
  styleUrls: ['./tarea.page.scss'],
})
export class TareaPage implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router) { }

  //para visualizar objetos en la vista
  keys(objeto: Object){
    return Object.keys(objeto || {})
  }

  tarea //estructura dinamica
  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    firebase.database().ref('tareas/'+id).on('value',(datos)=>{
      if(datos.exists()){
        this.tarea=datos.val()
        this.tarea['id'] = id
        console.log('tarea consultada => ',this.tarea);
      }else{
        this.tarea = {}
        console.log('tarea no encontrada');
        
      }
      
      
    })
  }

  ngOnDestroy(){
    //desvincular el oyende de lectura en tiempo real
    firebase.database().ref('teareas').off()
  }

  terminar(){
    firebase.database().ref('tareas/'+this.tarea.id+'/status').set("terminada").then(()=>{
      console.log('tarea modificada correctamente');
      
    }).catch((erro)=>{
      console.log('error al intentar modificar la tarea =>', erro);
      
    })
  }

  eliminar(){
    firebase.database().ref('tareas/'+this.tarea.id).set(null).then(()=>{
      console.log('tarea eliminada correctamente');
      this.router.navigate(['/tareas'])
      
    }).catch((erro)=>{
      console.log('error al intentar eliminar la tarea =>', erro);
      
    })
  }

}
