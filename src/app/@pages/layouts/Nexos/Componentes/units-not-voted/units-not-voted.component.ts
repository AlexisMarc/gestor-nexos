import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { DataProfile } from '../../interface/dataProfile.model';
import { ConfigurationRestService } from '../../service/configuration.rest.service';

@Component({
  selector: 'app-units-not-voted',
  templateUrl: './units-not-voted.component.html',
  styleUrls: ['./units-not-voted.component.scss']
})
export class UnitsNotVotedComponent implements OnInit {
  @Input() residential_id: string;
  @Input() meeting_id: string;

  keysession: string;
  unitslist: any;
  totalunits: number;
  totalnovotedunits: number;
  totalvotedunits: number;
  selectallvoters: any;
  activemorosos: any;
  statusallquestions: any;
  verifiedallquestions: any;
  sector_name = "";
  unit_name = "";
  arrayVoteProfile: DataProfile[] = [];
  status = 0;

  constructor(
    private httpClient: HttpClient,
    private config: ConfigurationRestService,
    @Inject(SESSION_STORAGE)
    private storage: WebStorageService,
  ) {
    const userStorage = this.storage.get('user');
    this.keysession = userStorage['content']['token'];
    this.totalnovotedunits = 0;
    this.totalvotedunits = 0;
  }

  ngOnInit(): void {
    this.httpClient.get(this.config.endpoint6 + 'api/units/getBuildingsUnitByUserByMeeting/' + this.keysession + '/' + this.meeting_id)
      .subscribe(response => {
        if (response['success']) {
          this.unitslist = response['content'];
          this.sector_name = this.unitslist[0]['name'];
          this.unit_name = this.unitslist[0]['units'][0]['name'];
          this.unitslist.forEach((building) => {
            building['units'].forEach((unit: any) => {
              unit['can_vote'] = unit['can_vote'].toString();
              if (unit['can_vote'] == 0) {
                this.totalnovotedunits++;
              }
              else {
                this.totalvotedunits++;
              }
            });
            this.totalunits = this.totalnovotedunits + this.totalvotedunits;
            if (this.totalvotedunits == this.totalunits) {
              this.selectallvoters = 'true';
            }
            if (this.totalnovotedunits == this.totalunits) {
              this.selectallvoters = 'false';
            }
          });
        }
      });
  }

  getUnitByFilter(n: any, id: any) {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById(id) as HTMLInputElement;
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable") as HTMLTableElement;
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[n];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1 || txtValue.toUpperCase().indexOf('DANIELSARMIENTO') > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }

  changeStatusToAllVoters(status: string) {
    var input, filter, table, tr, td, i, txtValue, radio, td2, radioId, arrayUnit;
    input = document.getElementById('myInput') as HTMLInputElement;
    filter = input.value.toUpperCase();
    if (filter != '') {
      table = document.getElementById("myTable") as HTMLTableElement;
      tr = table.getElementsByTagName("tr");
      for (i = 1; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        td2 = tr[i].getElementsByTagName("td")[3];
        radio = td2.getElementsByTagName("input") as HTMLInputElement;
        radioId = td2.getElementsByTagName("input")[0].id;
        if (td) {
          txtValue = td.textContent || td.innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            arrayUnit = radioId.split("-");
            if (this.unitslist[arrayUnit[0] * 1]['units'][arrayUnit[1] * 1]['can_vote'] != status) {
              this.unitslist[arrayUnit[0] * 1]['units'][arrayUnit[1] * 1]['can_vote'] = status;
              this.counterData(status);
            }
          }
        }
      }
    } else {
      this.unitslist.forEach((building) => {
        building['units'].forEach((unit: any) => {
          unit['can_vote'] = status;
        });
        if (status == "1") {
          this.totalnovotedunits = 0;
          this.totalvotedunits = this.totalunits;
        } else {
          this.totalnovotedunits = this.totalunits;
          this.totalvotedunits = 0;
        }
      });
    }
  }

  counterData(status: any) {
    if (status == "1") {
      this.totalvotedunits++;
      this.totalnovotedunits--;
      if (this.totalvotedunits == this.totalunits) {
        this.selectallvoters = 'true';
      } else {
        this.selectallvoters = null;
      }
    }
    else {
      this.totalnovotedunits++;
      this.totalvotedunits--;
      if (this.totalnovotedunits == this.totalunits) {
        this.selectallvoters = 'false';
      } else {
        this.selectallvoters = null;
      }
    }
  }

  saveConfigurationForAllQuestions() {
    if (this.statusallquestions) {
      this.verifiedallquestions = true;
    } else {
      this.verifiedallquestions = false;
    }
  }

  saveChanges() {
    this.status = 1;
    var units;
    var button = document.getElementById('button-event');
    this.unitslist.forEach((building) => {
      building['units'].forEach((unit: any) => {
        var profile = new DataProfile(unit['id'], unit['can_vote']);
        this.arrayVoteProfile.push(profile);
      });
    });
    units = JSON.stringify(this.arrayVoteProfile);
    var formData = new FormData;
    formData.append('units', units);
    formData.append('meeting_id', this.meeting_id);
    this.httpClient.post(this.config.endpoint6 + 'api/units/updateMultipleUnits/' + this.keysession, formData).subscribe((response) => {
      if (response['success']) {
        this.status = 2;
        button!.classList.toggle('succes-event')
        setTimeout(() => {
          button!.classList.toggle('succes-event')
          this.status = 0;
        }, 3000);
      } else {
        this.status = 3;
        button!.classList.toggle('succes-not-event')
        setTimeout(() => {
          button!.classList.toggle('succes-not-event')
          this.status = 0;
        }, 3000);
      }
    });
  }

}