import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { MatDialog } from '@angular/material/dialog';
import { FormularioTareaComponent } from '../formulario-tarea/formulario-tarea.component';
import { async } from '@angular/core/testing';
@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.page.html',
  styleUrls: ['./tareas.page.scss'],
})
export class TareasPage implements OnInit {

  constructor(public dialog: MatDialog) { }

  user= {} //estructura dinamica
  ngOnInit() {
    this.consultarTareasTiempoReal()

    //para verificar el usuario con sesion iniciada
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        this.user = user
      }else{
        this.user = {}
      }
    })
  }

  ngOnDestroy(){
    //desvincular el oyende de lectura en tiempo real
    firebase.database().ref('tareas').off()
  }

  //para visualizar objetos en la vista
  keys(objeto: Object){
    return Object.keys(objeto || {})
  }

  tareas //estructura dinamica
  consultarTareasTiempoReal(){
    let filtro = (this.user['uid'] || 'publica')
    firebase.database().ref('tareas').orderByChild('propietario').equalTo(filtro).on('value',(datos)=>{
      if (datos.exists()) {
        this.tareas = datos.val()
        console.log('tareas encontradas => ', this.tareas)
      }else{
        this.tareas = {}
        console.log('no se encontraron tareas en db')
        
      }
    })
  }

  //modal registro de tareas
  modalRegistro(): void {
    const dialogRef = this.dialog.open(FormularioTareaComponent, {
      panelClass: ['row','margin-0','center-xs','col-xs-12','col-sm-8','col-md-4','col-lg-3'],
      data: {}
    }
    );
    
    //oyente, que esta pendiente al cerrado del modal
    dialogRef.afterClosed().subscribe(tarea => {
      if(tarea){
        tarea['status'] = "pendiente"
        tarea['propietario'] = (this.user['uid'] || 'publica')
        this.registrarTarea(tarea);
      }
      
    });
  }

  //registar tarea en base de datos
  idTarea //global
  async registrarTarea(tarea){
    let rutaTarea = firebase.database().ref('/tareas')
    this.idTarea = rutaTarea.push().key

    let urlImagen = (tarea.urlImagen || null)
    tarea.urlImagen = null
    await rutaTarea.child(this.idTarea).set(tarea).then(()=>{
      console.log('datos guardados correctametne')
    }).catch((erro)=>{
      console.log('ocurrio un error al intentar guardar la tarea -> ', erro) 
    })

    if(urlImagen){
      this.subirImagen(urlImagen)
    }


  }

  //limpiar tareas terminadas
  limpiarTerminadas(){
    //lista de tareas a eliminar
    let updates:any = {}
    for(let tarea of this.filtrar('terminada')){
      updates['tareas/'+tarea] = null
    }

    //elimino de la base de datos todas las de la lista
    firebase.database().ref().update(updates).then(()=>{
      console.log('tareas terminadas limpiadas correctamente');
    }).catch((erro)=>{
      console.log('error al limpiar las tareas =>',erro);
      
    })
  }

  //crear un arreglo con las tareas terminadas
  filtrar(filtro): any[]{
    return  this.keys(this.tareas).filter((tarea) => (this.tareas[tarea].status).toString().toLowerCase().includes(filtro))
  }

  //subir imagen de forma asincrona mientras se registra la tarea con sus datos
  subirImagen(urlImagen){
    
    let subiendoImagen = firebase.storage().ref('imagenes/'+this.idTarea).putString(urlImagen, 'data_url').then(async(datos)=>{
      console.log('subido correctamente');
       
       let updates:any ={}
        await datos.ref.getDownloadURL().then((downloadURL) => {
          console.log('link de descarga ', downloadURL);
          
          updates['tareas/'+this.idTarea+'/urlImagen'] = downloadURL
           firebase.database().ref().update(updates).then(()=>{
            console.log('tarea actualizada con su urlimagen');
          }).catch((erro)=>{
            console.log('error al actualizar la foto de la tarea en db =>', erro);
          })
      });
       
       
        
       
    }).catch((erro)=>{
      console.log('ocurrio un error al subir la foto', erro);
      
    })
    
  }

}
