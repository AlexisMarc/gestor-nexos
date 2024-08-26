import { Component, OnInit, Input, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { CreateUserServicesService } from '../../service/create-user-services.service';
import { ConfigurationRestService } from '../../service/configuration.rest.service';
import { HttpClient } from '@angular/common/http';
import { WebStorageService, SESSION_STORAGE } from 'angular-webstorage-service';
import Swal from 'sweetalert2';
declare var bootstrap: any

@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.component.html',
  styleUrls: ['./create-users.component.scss']
})
export class CreateUsersComponent implements OnInit {
  @Input() createParamtsUser = {
    name: '',
    id: '0',
    email: '',
    password: '',
    phone: '',
    profile_id: '0',
    status_id: '1',
  }
  id: any;
  profile: any;
  allProfile: any;
  imgURL: any;
  fileData: File | null = null;
  previewUrl: any = null;
  keysession!: string;
  passwordValid = false;

  constructor(private router: Router,
    private createUserServices: CreateUserServicesService,
    private config: ConfigurationRestService,
    private httpClient: HttpClient,
    @Inject(SESSION_STORAGE)
    private storage: WebStorageService
  ) {
    const userStorage = this.storage.get('user');
    // tslint:disable-next-line: max-line-length
    if (userStorage['content']['profile'] === 'Super Usuario') {
    } else {
      Swal.fire('Atención', 'Usted no esta autorizado para ingresar <br> pongase en contacto con la Gerencia', 'error');
      this.router.navigate(['/home']);
      return;
    }
    // tslint:disable-next-line: max-line-length
    if (userStorage === null || userStorage === 'null' || userStorage === undefined || userStorage === 'undefined' || userStorage === '' || userStorage['content']['status_id'] === 0) {
      sessionStorage.clear();
      this.router.navigate(['/']);
    }
    // service profiles
    this.httpClient.get(this.config.endpoint + 'UserServices/getAllUserProfiles?key=' + this.config.key)
      .subscribe((resp:any)=> {
        this.allProfile = resp['content'];
      });
    this.keysession = userStorage['content']['token'];
  }

  ngOnInit() {
    var myInput = document.getElementById("psw") as HTMLInputElement;
    var letter = document.getElementById("letter");
    var capital = document.getElementById("capital");
    var number = document.getElementById("number");
    var length = document.getElementById("length");
    var letterValid = false;
    var capitalValid = false;
    var numberValid = false;
    var lengthValid = false;

    var buttonSubmit = document.getElementById("buttonSubmit")
    buttonSubmit!.addEventListener("hover", closePassCollapsible)

    function closePassCollapsible() {
      var myCollapse = document.getElementById('myCollapse')
      var bsCollapse = new bootstrap.Collapse(myCollapse, {
        toggle: false
      })
      bsCollapse.hide();
    }

    myInput.onfocus = function () {
      var myCollapse = document.getElementById('myCollapse')
      var bsCollapse = new bootstrap.Collapse(myCollapse, {
        toggle: false
      })
      bsCollapse.show();
    }
 
    myInput.onblur = () => {
      if (letterValid && capitalValid && numberValid && lengthValid) {
        var myCollapse = document.getElementById('myCollapse')
        var bsCollapse = new bootstrap.Collapse(myCollapse, {
          toggle: false
        })
        bsCollapse.toggle();
        this.passwordValid = true;
      } else {
        this.passwordValid = false;
      }
    }

    // When the user starts to type something inside the password field
    myInput.onkeyup = () => {
      // Validate lowercase letters
      var lowerCaseLetters = /[a-z]/g;
      if (myInput.value.match(lowerCaseLetters)) {
        letter!.classList.remove("invalid");
        letter!.classList.add("valid");
        letterValid = true;
        if (letterValid && capitalValid && numberValid && lengthValid) {
          this.passwordValid = true;
        }
      } else {
        letter!.classList.remove("valid");
        letter!.classList.add("invalid");
        letterValid = false;
      }

      // Validate capital letters
      var upperCaseLetters = /[A-Z]/g;
      if (myInput.value.match(upperCaseLetters)) {
        capital!.classList.remove("invalid");
        capital!.classList.add("valid");
        capitalValid = true;
        if (letterValid && capitalValid && numberValid && lengthValid) {
          this.passwordValid = true;
        }
      } else {
        capital!.classList.remove("valid");
        capital!.classList.add("invalid");
        capitalValid = false;
      }

      // Validate numbers
      var numbers = /[0-9]/g;
      if (myInput.value.match(numbers)) {
        number!.classList.remove("invalid");
        number!.classList.add("valid");
        numberValid = true;
        if (letterValid && capitalValid && numberValid && lengthValid) {
          this.passwordValid = true;
        }
      } else {
        number!.classList.remove("valid");
        number!.classList.add("invalid");
        numberValid = false;
      }

      // Validate length
      if (myInput.value.length >= 8) {
        length!.classList.remove("invalid");
        length!.classList.add("valid");
        lengthValid = true;
        if (letterValid && capitalValid && numberValid && lengthValid) {
          this.passwordValid = true;
        }
      } else {
        length!.classList.remove("valid");
        length!.classList.add("invalid");
        lengthValid = false;
      }
    }

  }
  goHome() {
    this.router.navigate(['/home'])
  }

  createUserNew() {
    const emailFormat = this.validateEmail(this.createParamtsUser.email)

    if (!this.passwordValid) {
      Swal.fire('Atencion', 'La contraseña debe cumplir con todos los parametros', 'warning');
      return;
    }

    if (this.createParamtsUser.name === '') {
      Swal.fire('Atencion', 'El nombre es obligatorio', 'warning');
      return;
    }
    if (this.createParamtsUser.password == '') {
      Swal.fire('Atencion', 'La contraseña es obligatoria', 'warning');
      return;
    }
    if (!emailFormat) {
      Swal.fire('Atencion', 'El formato del email no es correcto', 'warning');
      return;
    }

    if (this.createParamtsUser.phone == '') {
      Swal.fire('Atencion', 'El telefono es obligatorio', 'warning');
      return;
    }
    if (this.createParamtsUser.profile_id == '0') {
      Swal.fire('Atencion', 'El tipo de perfil es obligatorio', 'warning');
      return;
    }
    if (this.createParamtsUser.status_id == '') {
      Swal.fire('Atencion', 'El estado es obligatorio', 'warning');
      return;
    }
    if (this.fileData == null) {
      Swal.fire('Atencion', 'la foto de perfil es obligatorio', 'warning');
      return;
    }

    const formData = new FormData();
    // formData.append('key', this.config.key);
    formData.append('id', this.createParamtsUser['id']);
    formData.append('name', this.createParamtsUser['name']);
    formData.append('email', this.createParamtsUser['email']);
    formData.append('password', this.createParamtsUser['password']);
    formData.append('phone', this.createParamtsUser['phone']);
    formData.append('profile_id', this.createParamtsUser['profile_id']);
    formData.append('status_id', this.createParamtsUser['status_id']);
    formData.append('file', this.fileData);
    this.createUserServices.CreateUser(formData, this.keysession);
  }
  // cargar imagenes//
  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview();

  }
  preview() {
    // Show preview 
    var mimeType = this.fileData!.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.fileData!);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
    }
  }
  goMenuSetting() {
    this.router.navigate(['home/menusetting'])
  }
  goListUser() {
    this.router.navigate(['home/userlist'])
  }
  validateEmail(email: String) {
    // tslint:disable-next-line: max-line-length
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

}
