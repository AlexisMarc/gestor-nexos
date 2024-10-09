import { Component, OnInit, ViewEncapsulation, TemplateRef, ContentChild, HostListener, HostBinding, inject } from '@angular/core';
import { pagesToggleService } from '../../services/toggler.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ConfigurationRestService } from '../../layouts/Nexos/service/configuration.rest.service';
import { Subscription } from 'rxjs';
import { EnvServiceService } from '@env';

////declare var pg: any;

@Component({
  selector: 'pg-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  host: {
    'class': 'page-sidebar',
  },
  encapsulation: ViewEncapsulation.None
})
export class SidebarComponent implements OnInit {
  private _env = inject(EnvServiceService)

  token: string;

  constructor(
    private router: Router,
    private toggler: pagesToggleService,
    private httpClient: HttpClient,
    private config: ConfigurationRestService,) {
    this.userStorage = JSON.parse(sessionStorage.getItem('user')!);
    this.token = this.userStorage['token'];

    this.subscriptions.push(this.toggler.sideBarToggle.subscribe(toggle => { this.toggleMobile(toggle); }));
    this.subscriptions.push(this.toggler.pageContainerHover.subscribe(message => { this.closeSideBar(); }));
    this.subscriptions.push(this.toggler.menuDrawer.subscribe(message => { this.toggleDrawer(); }));
    this.mobileSidebar = false;
  }

  subscriptions: Array<Subscription> = [];
  pin = false;
  drawer = false;
  sidebar:any;
  timer:any;
  _menuPin = false;
  _menuDrawerOpen = false;
  id_perfil: any;
  uuid: any;
  userStorage: any;

  @HostBinding('style.transform')
  style!: string;

  private sideBarWidth = 280;
  private sideBarWidthCondensed = 280 - 70;


  @ContentChild('sideBarOverlay', { read: true, static: false }) sideBarOverlay!: TemplateRef<void>;
  @ContentChild('sideBarHeader', { read: true, static: false }) sideBarHeader!: TemplateRef<void>;
  @ContentChild('menuItems', { read: true, static: false }) menuItems!: TemplateRef<void>;
  @HostBinding('class.visible') mobileSidebar: boolean;



  toggleMenuDrawer() {
    this._menuDrawerOpen = (this._menuDrawerOpen == true ? false : true);
    this.toggler.toggleMenuDrawer();
  }

  toggleMenuPin2($event:any) {
    // if (pg.isVisibleSm()) {
    //   this._menuPin = false;
    //   return;
    // }
    if (this._menuPin) {
      //pg.removeClass(document.body, 'menu-pin');
      this._menuPin = false;
    } else {
      //pg.addClass(document.body, 'menu-pin');
      this._menuPin = true;
    }
  }

  ngOnInit() {
  }
  ngOnDestroy() {
    for (const subs of this.subscriptions) {
      subs.unsubscribe();
    }
    clearTimeout(this.timer);
  }

  @HostListener('mouseenter', ['$event'])
  @HostListener('click', ['$event'])
  openSideBar() {
    //if (pg.isVisibleSm() || pg.isVisibleXs()) { return false }
    if (this.pin) { return false; }

    this.style = 'translate3d(' + this.sideBarWidthCondensed + 'px, 0,0)';
    //pg.addClass(document.body, 'sidebar-visible');
    return;
  }

  @HostListener('mouseleave', ['$event'])
  @HostListener('dblclick', ['$event'])
  closeSideBar() {
    //if (pg.isVisibleSm() || pg.isVisibleXs()) { return false }
    if (this.pin) { return false; }

    // tslint:disable-next-line: semicolon
    this.style = 'translate3d(0,0,0)'
    //pg.removeClass(document.body, 'sidebar-visible');
    // this.drawer = false;
    return;
  }

  // Nexos sidebar
  toggleMenuPin() {
    if (this.pin) {
      this.pin = false;
    }

    else {
      this.pin = true;
    }
  }

  toggleDrawer() {
    if (this.drawer) {
      this.drawer = false;
    }
    else {
      this.drawer = true;
    }
  }

  toggleMobile(toggle: boolean) {
    clearTimeout(this.timer);
    if (toggle) {
      this.mobileSidebar = toggle;
    } else {
      this.timer = setTimeout(() => {
        this.mobileSidebar = toggle;
      }, 400);
    }
  }

  goQuote() {
    this.router.navigate(['home/quote']);
  }

  goListProfile() {
    this.router.navigate(['home/profilelist']);
  }

  goListUser() {
    this.router.navigate(['home/userlist']);
  }

  goHome() {
    this.router.navigate(['home/']);
  }

  goListPromotion() {
    this.router.navigate(['home/Promotionlist']);
  }

  goListItems() {
    this.router.navigate(['home/itemslist']);
  }

  goVotationSetting() {
    this.router.navigate(['home/menusettingVoting']);
  }

  goRegisterSetting() {
    this.router.navigate(['home/register']);
  }

  goSupportTechinical() {
    this.router.navigate(['home/Soporte']);
  }

  singOut() {
    this.httpClient.get(this._env.ENDPOINT_PRIMARY + this._env.GESTOR_V2 + 'api/users/closeSession/' + this.token).subscribe((response :any)=> {
      sessionStorage.removeItem('user');
      this.router.navigate(['/']);
    })
  }

  goMenuSetting() {
    this.router.navigate(['home/menusetting']);
  }

  goTracing() {
    this.router.navigate(['home/tracing']);
  }
  
}