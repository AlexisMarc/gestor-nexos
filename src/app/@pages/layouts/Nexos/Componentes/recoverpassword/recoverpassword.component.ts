import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfigurationRestService } from '../../service/configuration.rest.service';
import { ForgotPasswordService } from '../../service/forgot-password.service';

@Component({
  selector: 'app-recoverpassword',
  templateUrl: './recoverpassword.component.html',
  styleUrls: ['./recoverpassword.component.scss']
})
export class RecoverpasswordComponent implements OnInit {

  @Input() parametros = {
    key: this.config.key,
    email: ''
  }

  constructor(private router: Router,
    private route: ActivatedRoute,
    private config: ConfigurationRestService,
    private forgotPassword: ForgotPasswordService) { }

  ngOnInit() {
  }

  recuperar_clave() {
    const formData = new FormData();
    formData.append('key', this.config.key);
    formData.append('email', this.parametros.email);
    this.forgotPassword.forgotPassword(formData);
  }

  irInicio() {
    this.router.navigate(['/home'])
  }
}