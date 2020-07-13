import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import * as firebase from 'firebase';

//cadena de conexion a db Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCEAc5Siz_04eSp4T3-kSyLp5Y5OW0JQyo",
  authDomain: "taskapp-7a981.firebaseapp.com",
  databaseURL: "https://taskapp-7a981.firebaseio.com",
  projectId: "taskapp-7a981",
  storageBucket: "taskapp-7a981.appspot.com",
  messagingSenderId: "1031530546626",
  appId: "1:1031530546626:web:38f338dd44e7d8fd6e825b",
  measurementId: "G-LKT5DTM7FN"
};


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    { title: 'Tareas', url: '/tareas', src: '/assets/008-interview.svg'},
    { title: 'Acerca de', url: '/folder/Inbox', src: '/assets/018-smartphone-2.svg'},

  ];
  
  user //estructura dinamica
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    // evita crear otra instancia a la coneccion de la base de datos cada vez que abra la app.
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
      
    }

    //para verificar el usuario con sesion iniciada
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        this.user = user
      }else{
        this.user = null
      }
    })
  


    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }

  cerrarSesion(){
    firebase.auth().signOut().then(function() {
      console.log('sesion cerrada correctamente');
      
    }).catch(function(error) {
      console.log('error al intentar cerrar la sesion ', error);
      
    });
  }
}
