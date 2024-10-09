import { EnvServiceService } from '@env';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  private _env = inject(EnvServiceService)
  ngOnInit(): void {
    this._env.SECRET_KEY
    console.log(this._env.ENDPOINT_PRIMARY)
   }

}
