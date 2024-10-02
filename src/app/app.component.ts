import { Component} from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { NxToastComponent, NxConfirmDialogComponent, NxLoadingComponent } from '@shared';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NxToastComponent, NxConfirmDialogComponent, NxLoadingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  {
  constructor(){
    
  }


}
