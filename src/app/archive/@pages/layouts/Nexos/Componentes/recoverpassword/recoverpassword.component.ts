import { Component, OnInit, Input, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfigurationRestService } from '../../service/configuration.rest.service';
import { ForgotPasswordService } from '../../service/forgot-password.service';
import { EnvServiceService } from '@env';

@Component({
  selector: 'app-recoverpassword',
  templateUrl: './recoverpassword.component.html',
  styleUrls: ['./recoverpassword.component.scss']
})
export class RecoverpasswordComponent implements OnInit {
  private _env = inject(EnvServiceService)
  @Input() parametros

  constructor(private router: Router,
    private route: ActivatedRoute,
    private config: ConfigurationRestService,
    private forgotPassword: ForgotPasswordService) { 
      this.parametros = {
        key: this._env.SECRET_KEY,
        email: ''
      }
    }

  ngOnInit() {
  }

  recuperar_clave() {
    const formData = new FormData();
    formData.append('key', this._env.SECRET_KEY);
    formData.append('email', this.parametros.email);
    this.forgotPassword.forgotPassword(formData);
  }

  irInicio() {
    this.router.navigate(['/home'])
  }
}