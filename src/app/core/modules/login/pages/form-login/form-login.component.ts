import { Component, inject, type OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NxValidators } from '@helpers';
import { RespAuth, RespData } from '@models';
import { AuthService, ReqAuth, StorageService } from '@services';
import { NxLoadingService, NxToastService } from '@shared';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrl: './form-login.component.css',
})
export class FormLoginComponent implements OnInit {
  public form: FormGroup = new FormGroup({
    email: new FormControl('', [
      NxValidators.required(),
      NxValidators.email(),
      NxValidators.maxLength(150),
    ]),
    password: new FormControl('', [
      NxValidators.required(),
      NxValidators.maxLength(50),
    ]),
    source: new FormControl('gestor'),
  });

  private _authService = inject(AuthService);
  private _storageService = inject(StorageService);
  private _router = inject(Router);

  private _serviceMessage = inject(NxToastService);
  private _loading = inject(NxLoadingService);

  ngOnInit(): void {}

  saveForm() {
    if (this.form.invalid) {
      this._serviceMessage.addMessage({
        type: 'warning',
        message: 'Por favor completar todos los campos requeridos',
      });
      this.form.markAllAsTouched();
      return;
    }
    const values: ReqAuth = this.form.getRawValue();
    this.authentication(values);
  }

  private authentication(data: ReqAuth) {
    this._loading.view(true);
    this._authService.Authentication(data).subscribe({
      next: (value) => {
        if (value.success) {
          this._storageService.setToken(value.content.token);
          this._storageService.setClient(value.content);
          this._router.navigateByUrl('/meeting');
          this._serviceMessage.addMessage({
            type: 'success',
            message: '¡Inicio de sesión exitoso!'
          })
          this._loading.view(false);
          this._router.navigateByUrl('/home')
          return;
        }
        this._loading.view(false);
        this._serviceMessage.addMessage({
          type: 'warning',
          message: 'Usuario o contraseña incorrectos...'
        })

      },
      error: () => {
        this._loading.view(false);
        this._serviceMessage.addMessage({
          type: 'error',
          message: 'Error al iniciar sesión...'
        })
      },
    });
  }
}
