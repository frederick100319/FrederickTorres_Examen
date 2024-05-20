import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Password } from 'primeng/password';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  form2: FormGroup;

  constructor(private fb: FormBuilder, private messageService: MessageService) {
    this.form2 = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  validarForm(): void {
    let formularioValido = true;

    if (this.form2.get('name')?.invalid) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Campo "nombre" incorrecto', life: 10000 });
      formularioValido = false;
    }
    
    if(this.form2.get('email')?.invalid){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Campo "email" incorrecto', life: 10000 });
      formularioValido = false;
    }
    
    if(this.form2.get('message')?.invalid){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Campo "mensaje" incorrecto', life: 10000 });
      formularioValido = false;
    }

    if(formularioValido){
      this.messageService.add({ severity: 'success', summary: 'Enhorabuena', detail: 'Formulario correcto', life: 10000 });
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Peligro', detail: 'Faltan campos por completar', life: 10000 });
      this.form2.markAllAsTouched();
    }
  }
  private isControlInvalid(controlName: string): boolean {
    const control = this.form2.get(controlName);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }
  
  getControlClasses(controlName: string): string {
    return this.isControlInvalid(controlName) ? 'ng-dirty ng-invalid' : '';
  }
  get nameInvalid(): boolean {
    return this.isControlInvalid('name');
  }
  get emailInvalid(): boolean {
    return this.isControlInvalid('email');
  }
  get messageInvalid(): boolean {
    return this.isControlInvalid('message');
  }
}
