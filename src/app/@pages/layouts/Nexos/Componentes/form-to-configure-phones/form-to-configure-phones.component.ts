import { Component, OnInit, Input } from '@angular/core';
import { WhatsappService } from '../../service/whatsaap_services';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-to-configure-phones',
  templateUrl: './form-to-configure-phones.component.html',
  styleUrls: ['./form-to-configure-phones.component.scss']
})
export class FormToConfigurePhonesComponent implements OnInit {
  form_params = {
    phone: null,
    facebook_phone_id: '',
    status: '',
    country_code: '',
    id: 0

  }

  constructor(
    private _whatsappService: WhatsappService,
    private router: Router
  ) {
    this.cargaObjeto()
  }

  ngOnInit() {
  }
  push() {
    if (this.form_params.phone === null || this.form_params.status === '' || this.form_params.facebook_phone_id === '' || this.form_params.country_code === null) {
      Swal.fire(
        'No se envio la peticion!',
        'Falta algun campo por diligenciar',
        'error'
      )
    } else {
      let data = JSON.stringify(this.form_params)
      this._whatsappService.postFormToConfigPhones(data).subscribe(resp => {
        if (resp.success) {
          Swal.fire({
            title: '<strong>Guardado Exitoso</strong>',
            type: 'success',
            html: resp.message,
          })
          this.router.navigate(['home/numberlistWhatsapp'])
        } else {
          Swal.fire({
            title: '<strong>Ups! algo salio mal</strong>',
            type: 'error',
            html: resp.message,
          })
        }
      })

    }
  }

  cargaObjeto() {
    let navigation = this.router.getCurrentNavigation();
    if (navigation === null || navigation.extras.skipLocationChange === false) {
    } else {
      let object = navigation.extras.state.example
      this.form_params.id = object.id
      this.form_params.facebook_phone_id = object.facebook_phone_id
      this.form_params.status = object.status
      this.form_params.country_code = object.country_code
      this.form_params.phone = object.phone
    }
  }
}
