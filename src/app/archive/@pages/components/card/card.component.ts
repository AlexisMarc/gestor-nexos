import {
    Component,
    Input,
    ViewEncapsulation,
    ElementRef,
    ViewChild,
    TemplateRef,
    ContentChild,
    EventEmitter,
    Output
  } from '@angular/core';

  import {
    animate,
    state,
    style,
    transition,
    trigger,
  } from '@angular/animations';

  @Component({
    selector     : 'pgcard',
    encapsulation: ViewEncapsulation.None,
    templateUrl : './card.component.html',
    animations: [
      trigger('collapseState', [
        state('inactive', style({
          opacity: '0',
          height : 0,
          paddingBottom:'0'
        })),
        state('active', style({
          opacity: '1',
          height : '*',
          paddingBottom:'*'
        })),
        transition('inactive => active', animate('125ms ease-in')),
        transition('active => inactive', animate('125ms ease-out'))
      ]),
      trigger('fadeAnimation', [
        state('false', style({
          opacity: '0',
          visibility : 'hidden',
        })),
        state('true', style({
          opacity: '1',
          visibility : 'visible'
        })),
        transition('false => true', animate('500ms ease-in')),
        transition('true => false', animate('500ms ease-out'))
      ]),
    
    ],
  })
  export class pgCard {
    _isCollapsed:boolean = false;
    _isMaximixed:boolean = false;
    _isLoading:boolean = false;
    _minimalHeader:boolean = false;
    _message:string = "";
    _messageType:string = "danger";
    _messageVisible:boolean = false;
    _progressType:string = "circle";
    _progressColor:string = "";
    _showTools:boolean = true;
    _close_card:boolean = false;
    _refresh:boolean = true;
    _refreshColor:string = 'light';
    _close:boolean = true;
    _toggle:boolean = true;
    _maximize:boolean = true;
    _timeout:number = 0;
    _titleText:string = "";
    _type:string = "default";

    _extraHeaderClass = "";
    _extraBodyClass = "";

    _additionalClasses = "";
    
    @ViewChild('hostContent', { read: true, static: false }) _hostContent!: ElementRef;
    @ViewChild('minimalCircleLoading', { read: true, static: false }) minimalCircleLoading!: ElementRef;
    @ViewChild('minimalCircleLoadingTrigger', { read: true, static: false }) minimalCircleLoadingTrigger!: ElementRef;
    @ContentChild('CardTitle', { read: true, static: false }) CardTitle!: TemplateRef<void>;
    @ContentChild('CardExtraControls', { read: true, static: false }) CardExtraControls!: TemplateRef<void>;
    @Input()
    set Title(value:string){
      this._titleText = value
    }
    get Title(){
      return this._titleText;
    }

    @Input()
    set Type(value:string){
      this._type = value;
    }

    @Input()
    set MinimalHeader(value:boolean){
      this._minimalHeader = value;
    }

    @Input()
    set ProgressType(value:string){
      this._progressType = value;
    }

    @Input()
    set ProgressColor(value:string){
      this._progressColor = value;
    }

    @Input()
    set Refresh(value:boolean){
      this._refresh = value;
    }

    @Input()
    set RefreshColor(value:string){
      this._refreshColor = value;
    }

    @Input()
    set Maximize(value:boolean){
      this._maximize = value;
    }

    @Input()
    set Close(value:boolean){
      this._close = value;
    }

    @Input()
    set Toggle(value:boolean){
      this._toggle = value;
    }

    @Input()
    set HeaderClass(value:string){
      this._extraHeaderClass = value;
    }

    @Input()
    set BodyClass(value:string){
      this._extraBodyClass = value;
    }

    @Input()
    set AdditionalClasses(value:string){
      this._additionalClasses = value;
    }

    @Input()
    set Controls(value:boolean){
      this._showTools = value;
    }

    @Input()
    set ShowMessage(value:boolean){
      this._messageVisible = value;
    }

    @Input()
    set Message(value:string){
      this._message = value;
    }

    @Input()
    set Loading(value:boolean){
      this._isLoading = value;
    }

    @Input()
    set TimeOut(value:number){
      this._timeout = value;
    }

    @Output() onRefresh: EventEmitter<void> = new EventEmitter();

    toggle(): void {
      this._isCollapsed = (this._isCollapsed === true ? false : true);
    }
    
    
    maximize():void{
      let nativeElement = this._hostContent.nativeElement;
      if(this._isMaximixed){
        this._isMaximixed = false;
        nativeElement.style.left = null;
        nativeElement.style.top = null;
      }
      else{
        this._isMaximixed = true;
        let pagecontainer = document.querySelector(".content")!;
        
        let rect = pagecontainer.getBoundingClientRect();
        let elementRect = nativeElement.getBoundingClientRect();
        let style = window.getComputedStyle(pagecontainer);

        nativeElement.style.left = ((parseFloat(style["marginLeft"])+parseFloat(style["paddingLeft"])) + rect.left)+"px" ;
        nativeElement.style.top = (parseFloat(style["paddingTop"])+ rect.top)+"px";			
      }
    }
    alertDismiss():void{
      this._messageVisible = false;
    }
    refresh():void{
      if(!this._isLoading){
        this._isLoading = true
        this.onRefresh.emit();
      }
      if(this._timeout > 0){
        setTimeout(()=>{  
          this._isLoading = false
        }, this._timeout);
      }
    }
    close():void{
      this._close_card = true;
    }
  }
  