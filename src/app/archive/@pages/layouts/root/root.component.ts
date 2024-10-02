
import { OnInit, OnDestroy, ViewChild, Input, HostListener, Inject, Component } from '@angular/core';
import { pagesToggleService } from '../../services/toggler.service';
import { Router, Event, NavigationEnd,  } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { ConfigurationRestService } from '../Nexos/service/configuration.rest.service';
import { UserService } from '../Nexos/service/user.service';
import { Globals } from '../Nexos/interface/globals.model';
import { Subscription } from 'rxjs';

////declare var pg: any;

@Component({
  selector: 'root-layout',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
})
export class RootLayout implements OnInit, OnDestroy {

  nameResidencial!: string;


  @ViewChild('root', { read: true, static: false }) root: any;

  nombre_usuario!: string;
  id_usuario: any;
  photo: any;
  id: any;
  token!: string;

  layoutState!: string;
  extraLayoutClass!: string;
  _boxed: boolean = false
  _menuPin: boolean = false;
  _enableHorizontalContainer: boolean = false;
  _pageContainerClass = "";
  _contentClass = "";
  _footer: boolean = true;
  _menuDrawerOpen: boolean = false;
  //Mobile
  _secondarySideBar: boolean = false;
  //Mobile
  _mobileSidebar: boolean = false;
  //Mobile
  _mobileHorizontalMenu: boolean = false;
  _pageTitle: string = '';
  //Sub layout - eg: email
  _layoutOption: string = '';
  _subscriptions: Array<Subscription> = [];;
  _layout: any
  @Input()
  public contentClass: string = "";

  @Input()
  public pageWrapperClass: string = "";

  @Input()
  public footer: boolean = true;

  constructor(
    private httpClient: HttpClient,
    private config: ConfigurationRestService,
    public toggler: pagesToggleService,
    public router: Router,
    private userService: UserService,  
     
    private global: Globals) {
    global.listadoItems = [];
    const userStorage:any = JSON.parse(sessionStorage.getItem('user')!)!;
    if (userStorage == null || userStorage == undefined || userStorage == '') {
      sessionStorage.removeItem('user');
      this.router.navigate(['/']);
    }
    else {
      this.nombre_usuario = userStorage['name'];
      this.photo = userStorage['photo'];
      this.id = userStorage['id'];
      this.token = userStorage['token'];
    }

    if (this.layoutState) {
      //pg.addClass(document.body, this.layoutState);
    }
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        var root = this.router.routerState.snapshot.root;
        while (root) {
          if (root.children && root.children.length) {
            root = root.children[0];
          } else if (root.data) {
            //Custom Route Data here
            this._pageTitle = root.data["title"]
            this._layoutOption = root.data["layoutOption"];
            this._boxed = root.data["boxed"]
            break;
          } else {
            break;
          }
        }
        //Reset Any Extra Layouts added from content pages
       //pg.removeClass(document.body, this.extraLayoutClass);
        //Close Sidebar and Horizonta Menu
        if (this._mobileSidebar) {
          this._mobileSidebar = false;
          //pg.removeClass(document.body, "sidebar-open");
          this.toggler.toggleMobileSideBar(this._mobileSidebar);
        }
        this._mobileHorizontalMenu = false;
        this.toggler.toggleMobileHorizontalMenu(this._mobileHorizontalMenu);
        //Scoll Top
        this.scrollToTop();
      }

      //Subscribition List
      this._subscriptions.push(this.toggler.pageContainerClass
        .subscribe(state => {
          this._pageContainerClass = state;
        }));

      this._subscriptions.push(this.toggler.contentClass
        .subscribe(state => {
          this._contentClass = state;
        }));

      this._subscriptions.push(this.toggler.bodyLayoutClass
        .subscribe(state => {
          if (state) {
            this.extraLayoutClass = state;
            //pg.addClass(document.body, this.extraLayoutClass);
          }
        }));

      this._subscriptions.push(this.toggler.Applayout
        .subscribe(state => {
          this.changeLayout(state);
        }));

      this._subscriptions.push(this.toggler.Footer
        .subscribe(state => {
          this._footer = state;
        }));

      this._subscriptions.push(this.toggler.mobileHorizontaMenu
        .subscribe(state => {
          this._mobileHorizontalMenu = state;
        }));

    });
  }

  /** @function changeLayout
  *   @description Add Document Layout Class
  */
  changeLayout(type: string) {
    this.layoutState = type;
    if (type) {
      //pg.addClass(document.body, type);
    }
  }

  /** @function removeLayout
  *   @description Remove Document Layout Class
  */
  removeLayout(type: string) {
    //pg.removeClass(document.body, type);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    for (const sub of this._subscriptions) {
      sub.unsubscribe();
    }
  }
  ngAfterViewInit() {
  }

  /** @function scrollToTop
  *   @description Force to scroll to top of page. Used on Route
  */
  scrollToTop() {
    let top = window.pageYOffset;
    if (top == 0) {
      let scroller = document.querySelector(".page-container");
      if (scroller)
        scroller.scrollTo(0, 0);
    }
    else {
      window.scrollTo(0, 0)
    }
  }

  /** @function openQuickView
  *   @description Show Quick View Component / Right Sidebar - Service
  */
  openQuickView($e:any) {
    $e.preventDefault();
    this.toggler.toggleQuickView();
  }

  /** @function openSearch
  *   @description Show Quick Search Component - Service
  */
  openSearch($e:any) {
    $e.preventDefault();
    this.toggler.toggleSearch(true);
  }

  /** @function toggleMenuPin
  *   @description Permanently Open / Close Main Sidebar
  */
  toggleMenuPin($e:any) {
    // if (pg.isVisibleSm()) {
    //   this._menuPin = false;
    //   return;
    // }
    if (this._menuPin) {
      //pg.removeClass(document.body, "menu-pin");
      this._menuPin = false;
    } else {
      //pg.addClass(document.body, "menu-pin");
      this._menuPin = true;
    }
  }

  /** @function toggleMenuDrawer
  *   @description Open Main Sidebar Menu Drawer - Service
  */
  toggleMenuDrawer() {
    this._menuDrawerOpen = (this._menuDrawerOpen == true ? false : true);
    this.toggler.toggleMenuDrawer();
  }

  /** @function toggleMobileSidebar
  *   @description Open Main Sidebar on Mobile - Service
  */
  toggleMobileSidebar() {
    if (this._mobileSidebar) {
      this._mobileSidebar = false;
      //pg.removeClass(document.body, "sidebar-open");
    }
    else {
      this._mobileSidebar = true;
      //pg.addClass(document.body, "sidebar-open");
    }
    this.toggler.toggleMobileSideBar(this._mobileSidebar);
  }

  /** @function toggleHorizontalMenuMobile
  *   @description Open Secondary Sidebar on Mobile - Service
  */
  toggleSecondarySideBar() {
    this._secondarySideBar = (this._secondarySideBar == true ? false : true);
    this.toggler.toggleSecondarySideBar(this._secondarySideBar);
  }

  /** @function toggleHorizontalMenuMobile
  *   @description Call Horizontal Menu Toggle Service for mobile
  */
  toggleHorizontalMenuMobile() {
    this._mobileHorizontalMenu = (this._mobileHorizontalMenu == true ? false : true);
    this.toggler.toggleMobileHorizontalMenu(this._mobileHorizontalMenu);
  }

  @HostListener("window:resize", [])
  onResize() {
    this.autoHideMenuPin();
  }

  //Utils
  autoHideMenuPin() {
    if (window.innerWidth < 1025) {
      // if (pg.hasClass(document.body, "menu-pin")) {
      //   pg.addClass(document.body, "menu-unpinned");
      //   pg.removeClass(document.body, "menu-pin");
      // }
    }
    else {
      // if (pg.hasClass(document.body, "menu-unpinned")) {
      //   pg.addClass(document.body, "menu-pin");
      // }
    }
  }

  singOut() {
    this.httpClient.get(this.config.endpoint6 + 'api/users/closeSession/' + this.token).subscribe((response :any)=> {
      sessionStorage.removeItem('user');
      this.router.navigate(['/']);
    })
  }

  goEditUser() {
    this.router.navigate(['/home/editUsers/' + this.id]);

  }
}
