import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario-tarea',
  templateUrl: './formulario-tarea.component.html',
  styleUrls: ['./formulario-tarea.component.scss'],
})
export class FormularioTareaComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<FormularioTareaComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {}

  //estructura para usar formulario reactivo
  formulario = new FormGroup({
    nombre: new FormControl(null,Validators.required),
    descripcion: new FormControl(null,Validators.required),
    urlImagen: new FormControl(null),

  });

  //al cancelar el modal
  cancelar(){
    this.dialogRef.close()
  }

  //al confirmar el registro
  enviar(): void {
    if (this.formulario.invalid) {
      return;
    }
    
    this.dialogRef.close(this.formulario.value);
  }

  cargarImagen(archivos){
    
      if (archivos.length === 0)
        return;
   
      var mimeType = archivos[0].type;
      if (mimeType.match(/image\/*/) == null) {
        console.log('formato no soportado');
        
        return;
      }
   
      var reader = new FileReader();
      reader.readAsDataURL(archivos[0]); 
      reader.onload = (_event) => { 
        console.log('ruta imagen ',reader.result);
        this.formulario.controls.urlImagen.setValue(reader.result)
      }
    
  }
}
