import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormularioRegistroComponent } from '../formulario-registro/formulario-registro.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router: Router,public dialog: MatDialog) { }
  
  user // estrucutra dinamica
  ngOnInit() {
    //para verificar el usuario con sesion iniciada
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        this.user = user
        this.router.navigate(['/tareas'])
      }else{
        this.user = null
      }
    })
  }

  

  
  //estructura para usar formulario reactivo
  formulario = new FormGroup({
    correo: new FormControl(null,[Validators.required,Validators.email]),
    contrasena: new FormControl(null,Validators.required),
  });

  iniciarSesion(){
    firebase.auth().signInWithEmailAndPassword(this.formulario.value.correo,this.formulario.value.contrasena)
    .then((datos)=>{
      console.log('sesion iniciada correctamente ');
    }).catch((error)=> {
     console.log('ocurrio un error al intentar iniciar sesion => ',error);
     
    });
  }

  //modal registro de usuario
  modalRegistro(): void {
    const dialogRef = this.dialog.open(FormularioRegistroComponent, {
      panelClass: ['row','margin-0','center-xs','col-xs-12','col-sm-8','col-md-4','col-lg-3'],
      data: {}
    } 
    );
    
    //oyente, que esta pendiente al cerrado del modal
    dialogRef.afterClosed().subscribe(usuario => {
      if(usuario){
        firebase.auth().createUserWithEmailAndPassword(usuario.correo,usuario.contrasena).then(()=>{
          console.log('usuario creado correctamente');
        }).catch((erro)=>{
          console.log('ocurrio un error al intentar registar al usuario ', erro);
          
        })
      }
      
    });
  }

  
}
