import { Component, OnInit, Input, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ConfigurationRestService } from '../../service/configuration.rest.service';
import { CreateUserServicesService } from '../../service/create-user-services.service';
import { WebStorageService, SESSION_STORAGE } from 'angular-webstorage-service';
import Swal from 'sweetalert2';
declare var bootstrap: any

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.scss']
})
export class EditUsersComponent implements OnInit {
  @Input() userEdit = {
    name: '',
    id: '',
    email: '',
    password: '',
    phone: '',
    profile_id: '',
    status_id: '',
  }
  allProfile: any;
  idUser!: string;
  imgURL: any;
  fileData: File| null = null;
  previewUrl: any = null;
  id: any;
  profile: any;
  keysession!: string;
  passwordValid = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private config: ConfigurationRestService,
    private createUserServices: CreateUserServicesService,
    @Inject(SESSION_STORAGE)
    private storage: WebStorageService) {

    const userStorage = this.storage.get('user');
    if (userStorage['content']['profile'] === 'Super Usuario') {
    } else {
      Swal.fire('Atención', 'Usted no esta autorizado para ingresar <br> pongase en contacto con la Gerencia', 'error');
      this.router.navigate(['/home']);
      return;
  
    }
    if (userStorage == null || userStorage == undefined || userStorage == '') {
      this.storage.remove('user');
      this.router.navigate(['/']);
    }
    else {
      this.id = userStorage['content']['id'];
      this.profile = userStorage['content']['profile'];
    }

    this.idUser = this.route.snapshot.paramMap.get('idUser')!
    this.keysession = userStorage['content']['token'];
    //obtener user for id UserServices/getUserProfileById
    this.httpClient.get(this.config.endpoint6 + 'api/users/details/' + this.keysession + '/' + this.idUser)
      .subscribe((resp:any)=> {
        this.userEdit['name'] = resp['content']['name'];
        this.userEdit['id'] = resp['content']['id'];
        this.userEdit['email'] = resp['content']['email'];
        this.userEdit['password'] = resp['content']['password'];
        this.userEdit['phone'] = resp['content']['phone'];
        this.userEdit['profile_id'] = resp['content']['profile_id'];
        this.userEdit['status_id'] = resp['content']['status_id'] + '';
        this.previewUrl = resp['content']['photo']
        this.fileData = resp['content']['photo']
      })

    //obtener all profiles 
    this.httpClient.get(this.config.endpoint + 'UserServices/getAllUserProfiles?key=' + this.config.key)
      .subscribe((resp:any)=> {
        this.allProfile = resp['content']
      });
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

  editUser() {
    if (this.userEdit.password == undefined) {
      Swal.fire("Atencion", "La contraseña es obligatoria", "error");
      return
    }
    const formData = new FormData();
    formData.append('key', this.config.key);
    formData.append('id', this.userEdit['id']);
    formData.append('name', this.userEdit['name']);
    formData.append('email', this.userEdit['email']);
    formData.append('password', this.userEdit['password']);
    formData.append('phone', this.userEdit['phone']);
    formData.append('profile_id', this.userEdit['profile_id']);
    formData.append('status_id', this.userEdit['status_id']);
    formData.append('file', this.fileData!);
    this.createUserServices.editUser(formData, this.profile);
  }
  goMenuSetting() {
    this.router.navigate(['home/menusetting'])
  }
  goListUser() {
    this.router.navigate(['home/userlist'])
  }
  goHome() {
    this.router.navigate(['/home'])
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
}
