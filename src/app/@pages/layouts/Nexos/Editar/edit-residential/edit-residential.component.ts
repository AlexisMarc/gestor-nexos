import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ConfigurationRestService } from '../../service/configuration.rest.service';
import { InformationResidential } from '../../interface/informationResidential.model';
import { ListService } from '../../interface/listService.model';
import { GetAllActiveAppServicesTypeService } from '../../service/get-all-active-app-services-type.service';
import { SaveServiceIcloudService } from '../../service/save-service-icloud.service';
import swal from 'sweetalert2';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';

@Component({
  selector: 'app-edit-residential',
  templateUrl: './edit-residential.component.html',
  styleUrls: ['./edit-residential.component.scss']
})
export class EditResidentialComponent implements OnInit {
  exampleData: any;
  uuid_code: any;

  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};

  infoResidential: InformationResidential[] = [];
  editInfoResidential: InformationResidential[] = [];

  ListServiceActive: ListService[] = [];
  serviceActive: [] = [];
  address = 'CLL 25F 73B 61';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private httpClient: HttpClient,
    private config: ConfigurationRestService,
    private saveServiceIcloud: SaveServiceIcloudService,
    private getAllActiveAppServices: GetAllActiveAppServicesTypeService, @Inject(SESSION_STORAGE)
    private storage: WebStorageService) {
    const userStorage = this.storage.get('user');

    // tslint:disable-next-line: max-line-length
    if (userStorage['content']['profile'] === 'Super Usuario' || userStorage['content']['profile'] === 'Supervisor') {
    } else {
      swal.fire('Atención', 'Usted no esta autorizado para ingresar <br> pongase en contacto con la Gerencia', 'error');
      this.router.navigate(['/home']);
      return;

    }

    // tslint:disable-next-line: max-line-length
    if (userStorage === null || userStorage === 'null' || userStorage === undefined || userStorage === 'undefined' || userStorage === '' || userStorage['content']['status_id'] === 0) {
      sessionStorage.clear();
      this.router.navigate(['/']);
    }

    this.uuid_code = this.route.snapshot.paramMap.get('uuid_code');
    this.editInfoResidential['status_id'] = '1';

    // this.httpClient.get(this.config.endpoint + 'ResidentialServices/getResidentialById?key=' + this.config.key + '&residential_id=' + this.residential_id).subscribe((response) => {
    //   this.infoResidential = response['content'];
    // })

    this.httpClient.get(this.config.endpoint5 + 'getResidentialByCode?key=' + this.config.key + '&code=' + this.uuid_code)
      .subscribe(resp => {
        this.infoResidential = resp['content'];

        // tslint:disable-next-line: forin
        for (const index2 in resp['content']['hired_services']) {
          this.serviceActive[index2] = resp['content']['hired_services'][index2]['id'];
        }
      });
    this.ListServiceActive = this.getAllActiveAppServices.ListServiceActive;
  }
  goHome() {
    this.router.navigate(['home/']);
  }
  goMenuSettingVoting() {
    this.router.navigate(['home/menusettingVoting']);
  }
  goMenuSetListEnable() {
    this.router.navigate(['home/setListEnable']);
  }
  ngOnInit() {
  }
  saveService() {
    this.infoResidential['hired_services'] = this.serviceActive;
    const formData = new FormData();
    formData.append('key', this.config.key);
    formData.append('address', this.address);
    formData.append('uuid_code', this.uuid_code);
    formData.append('email', this.infoResidential['email']);
    formData.append('name', this.infoResidential['name']);
    formData.append('status_id', this.infoResidential['status_id']);
    formData.append('serviciosActivos', this.infoResidential['hired_services']);
    this.saveServiceIcloud.saveServiceActive(formData);

  }
}
