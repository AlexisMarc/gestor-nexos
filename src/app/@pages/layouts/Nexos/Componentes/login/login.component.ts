import { Component, OnInit, Input, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
 
import swal from 'sweetalert2';
import { ConfigurationRestService } from '../../service/configuration.rest.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Input() parametrosLogin 
  errorMessage: string | null = null;
  errorActive = false;
  localStorage: any;
  user: any;
  source = 'gestor';
  number:any
  constructor(private router: Router,
    private config: ConfigurationRestService,
    private userService: UserService,  
     ) {
      this.parametrosLogin = {
        key: this.config.key,
        email: '',
        password: ''
      }
    const userStorage:any = JSON.parse(sessionStorage.getItem('user')!)!;
    if (userStorage != null && userStorage.success) {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit() {
    this.number = new Date().getFullYear();
  }

  login() {
    const emailFormat = this.validateEmail(this.parametrosLogin.email);
    if (!emailFormat) {
      swal.fire('Atención', 'Por Favor agrege un formato de email valido', 'error');
      return;
    }
    if (this.parametrosLogin.email.length == 0, this.parametrosLogin.password.length === 0) {
      swal.fire('Atención', 'La contraseña es obligatoria', 'error');
      return;
    }
    const formData = new FormData();
    formData.append('key', this.config.key);
    formData.append('password', this.parametrosLogin.password);
    formData.append('email', this.parametrosLogin.email);
    formData.append('source', this.source);
    this.userService.authentication(formData);
  }

  navigate() {
    this.router.navigateByUrl('');
  }

  validateEmail(email: String) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  
}
