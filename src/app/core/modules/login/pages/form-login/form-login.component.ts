import { Component, inject, type OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NxValidators } from '@helpers';
import { RespAuth, RespData } from '@models';
import { AuthService, ReqAuth, StorageService } from '@services';
import { NxToastService } from '@shared';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrl: './form-login.component.css',
})
export class FormLoginComponent implements OnInit {
  public form: FormGroup;

  private _authService = inject(AuthService);
  private _storageService = inject(StorageService);
  private _router = inject(Router);

  constructor() {
    this.form = new FormGroup({
      email: new FormControl('', [
        NxValidators.required(),
        NxValidators.email(),
        NxValidators.maxLength(150),
      ]),
      password: new FormControl('', [
        NxValidators.required(),
        NxValidators.maxLength(50),
      ]),
    });
  }

  private _serviceMessage = inject(NxToastService);

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
    const values: ReqAuth = this.form.value;
    this.authentication(values);
  }

  private authentication(data: ReqAuth) {
    this._authService.Authentication(data).subscribe({
      next: (value: RespData<RespAuth>) => {
        if (value.success) {
          this._storageService.setToken(value.content.token);
          this._storageService.setClient(value.content);
          this._router.navigateByUrl('/meeting');
          console.log(value);
        }
      },
      error: () => {},
    });
  }
}
