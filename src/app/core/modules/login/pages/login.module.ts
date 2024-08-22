import { NgModule } from '@angular/core';
import { FormLoginComponent, RecoveryLoginComponent } from '@login';

@NgModule({
  declarations: [
    FormLoginComponent,
    RecoveryLoginComponent,
  ],
  exports: []
})
export class LoginModule {}
