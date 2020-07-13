import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario-registro',
  templateUrl: './formulario-registro.component.html',
  styleUrls: ['./formulario-registro.component.scss'],
})
export class FormularioRegistroComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<FormularioRegistroComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {}
  //estructura para usar formulario reactivo
  formulario = new FormGroup({
    correo: new FormControl(null,[Validators.required,Validators.email]),
    contrasena: new FormControl(null,Validators.required),
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

}
