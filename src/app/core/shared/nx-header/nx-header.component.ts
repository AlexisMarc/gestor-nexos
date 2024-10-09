import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  type OnInit,
} from '@angular/core';
import { NavigationEnd, Router, RouterLink, Scroll } from '@angular/router';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { filter } from 'rxjs';

@Component({
  selector: 'app-nx-header',
  standalone: true,
  imports: [CommonModule, NgScrollbarModule, RouterLink],
  templateUrl: './nx-header.component.html',
  styleUrl: './nx-header.component.css',
})
export class NxHeaderComponent implements OnInit {
  public listBreadcrumbs = [
    {
      name: 'Module',
      url: '/',
    },
    {
      name: 'Module',
      url: '/',
    },
  ];
  private _router = inject(Router);
  ngOnInit(): void {
    this._router.events.subscribe((event) => {
      if(event instanceof Scroll)
      this.createList(event.routerEvent.url);
    });
  }

  private createList(url: string) {
    const list = url.split('/').filter(url=>url!=='home' && url!=='' && url !=='new');
    const urlList = list.map((url, index) => ({ name: url, url }));
    this.listBreadcrumbs = [...urlList];
  }
}
