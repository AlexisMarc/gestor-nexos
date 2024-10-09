//  Angular Core
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  HammerGestureConfig,
  HAMMER_GESTURE_CONFIG,
} from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Injectable } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
//import { HttpModule} from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgxDropzoneModule } from 'ngx-dropzone';

//  Routing
import { AppRoutes } from './app.routing';
import { AppComponent } from '../app.component';

//  Layouts
// tslint:disable-next-line: max-line-length
import {
  CondensedComponent,
  BlankComponent,
  RootLayout,
  CorporateLayout,
  SimplyWhiteLayout,
  ExecutiveLayout,
  CasualLayout,
} from './@pages/layouts';
//  Layout Service - Required
import { pagesToggleService } from './@pages/services/toggler.service';

//  Shared Layout Components
import { SidebarComponent } from './@pages/components/sidebar/sidebar.component';
import { QuickviewComponent } from './@pages/components/quickview/quickview.component';
import { QuickviewService } from './@pages/components/quickview/quickview.service';
import { SearchOverlayComponent } from './@pages/components/search-overlay/search-overlay.component';
import { HeaderComponent } from './@pages/components/header/header.component';
import { HorizontalMenuComponent } from './@pages/components/horizontal-menu/horizontal-menu.component';
import { SharedModule } from './@pages/components/shared.module';
import { pgListViewModule } from './@pages/components/list-view/list-view.module';
import { pgCardModule } from './@pages/components/card/card.module';
import { pgCardSocialModule } from './@pages/components/card-social/card-social.module';

//  Basic Bootstrap Modules
import { TooltipModule } from 'ngx-bootstrap/tooltip';

//  Pages Globaly required Components - Optional
import { pgTabsModule } from './@pages/components/tabs/tabs.module';
import { pgSwitchModule } from './@pages/components/switch/switch.module';
import { ProgressModule } from './@pages/components/progress/progress.module';

//  Thirdparty Components / Plugins - Optional
//import { NvD3Module } from 'ngx-nvd3';
import { NgxEchartsModule, NgxEchartsDirective, provideEcharts } from 'ngx-echarts';
//import { IsotopeModule } from 'ngx-isotope';
import { StepsformDirective } from './social/stepsform.directive';
//import { NgxDnDModule} from '@swimlane/ngx-dnd';
import { QuillModule } from 'ngx-quill';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

//  Service - Demo content - Optional
import { ChartService } from './charts/charts.service';
import { SocialService } from './social/social.service';

//  Social Page - Optional
import { SocialComponent } from './social/social.component';
import { CoverpageDirective } from './social/coverpage.directive';

// Demo Pages - Optional
import { CardsComponentPage } from './cards/cards.component';
import { ViewsPageComponent } from './views/views.component';
import { ChartsComponent } from './charts/charts.component';

// Dashboard Widgets - Optional
import { DashboardModule } from './dashboard/dashboard.module';

// Dashboards - Optional
import { CondensedDashboardComponent } from './dashboard/condensed/dashboard.component';
import { SimplyWhiteDashboardComponent } from './dashboard/simplywhite/dashboard.component';
import { CasualDashboardComponent } from './dashboard/casual/dashboard.component';
import { CorporateDashboardComponent } from './dashboard/corporate/dashboard.component';
import { ExecutiveDashboardComponent } from './dashboard/executive/dashboard.component';

// Sample Blank Pages - Optional
import { BlankCorporateComponent } from './@pages/layouts/blank-corporate/blank-corporate.component';
import { BlankSimplywhiteComponent } from './@pages/layouts/blank-simplywhite/blank-simplywhite.component';
import { BlankCasualComponent } from './@pages/layouts/blank-casual/blank-casual.component';

// Font Awesone
import { AngularFontAwesomeModule } from 'angular-font-awesome';

// component Nexos
import { ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
//import { Select2Module } from 'ng2-select2';
//import { LoginComponent } from './@pages/layouts/Nexos/Componentes/login/login.component';
import { DashboardComponent } from './@pages/layouts/Nexos/Componentes/dashboard/dashboard.component';
import { RecoverpasswordComponent } from './@pages/layouts/Nexos/Componentes/recoverpassword/recoverpassword.component';
import { QuoteComponent } from './@pages/layouts/Nexos/Componentes/quote/quote.component';
import { CreatequoteComponent } from './@pages/layouts/Nexos/Componentes/createquote/createquote.component';
import { CreateUsersComponent } from './@pages/layouts/Nexos/Componentes/create-users/create-users.component';
import { CreateProfileComponent } from './@pages/layouts/Nexos/Componentes/create-profile/create-profile.component';

import { AdditemsComponent } from './@pages/layouts/Nexos/Componentes/additems/additems.component';
import { ConfirmquotationComponent } from './@pages/layouts/Nexos/Componentes/confirmquotation/confirmquotation.component';
import { EditUsersComponent } from './@pages/layouts/Nexos/Editar/edit-users/edit-users.component';
import { CreatePromotionComponent } from './@pages/layouts/Nexos/Componentes/create-promotion/create-promotion.component';
import { EditPromotionComponent } from './@pages/layouts/Nexos/Editar/edit-promotion/edit-promotion.component';
import { PromotionListComponent } from './@pages/layouts/Nexos/Listas/promotion-list/promotion-list.component';
import { CreateItemsComponent } from './@pages/layouts/Nexos/Componentes/create-items/create-items.component';
import { EditItemsComponent } from './@pages/layouts/Nexos/Editar/edit-items/edit-items.component';
import { ItemsListComponent } from './@pages/layouts/Nexos/Listas/items-list/items-list.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { SettingsComponent } from './@pages/layouts/Nexos/Componentes/settings/settings.component';
import { QuotationrateListComponent } from './@pages/layouts/Nexos/Listas/quotationrate-list/quotationrate-list.component';
import { CreateQuotationrateComponent } from './@pages/layouts/Nexos/Componentes/create-quotationrate/create-quotationrate.component';
import { EditQuotationrateComponent } from './@pages/layouts/Nexos/Editar/edit-quotationrate/edit-quotationrate.component';
import { QuotehistoryComponent } from './@pages/layouts/Nexos/Componentes/quotehistory/quotehistory.component';
import { CreateTextEmailComponent } from './@pages/layouts/Nexos/Componentes/create-text-email/create-text-email.component';
import { TextEmailListComponent } from './@pages/layouts/Nexos/Listas/text-email-list/text-email-list.component';
import { EditTextEmailComponent } from './@pages/layouts/Nexos/Editar/edit-text-email/edit-text-email.component';
import { CreateCityComponent } from './@pages/layouts/Nexos/Componentes/create-city/create-city.component';
import { CityListComponent } from './@pages/layouts/Nexos/Listas/city-list/city-list.component';
import { EditCityComponent } from './@pages/layouts/Nexos/Editar/edit-city/edit-city.component';
import { Globals } from './@pages/layouts/Nexos/interface/globals.model';
import { CustomerQuoteHistoryComponent } from './@pages/layouts/Nexos/Componentes/customer-quote-history/customer-quote-history.component';
import { TracingComponent } from './@pages/layouts/Nexos/Componentes/tracing/tracing.component';
import { TracingQuoteComponent } from './@pages/layouts/Nexos/Componentes/tracing-quote/tracing-quote.component';
import { TracingReportComponent } from './@pages/layouts/Nexos/Componentes/tracing-report/tracing-report.component';
import { ProfileEditComponent } from './@pages/layouts/Nexos/Editar/profile-edit/profile-edit.component';
import { ListProfileComponent } from './@pages/layouts/Nexos/Listas/list-profile/list-profile.component';
import { ListUsersComponent } from './@pages/layouts/Nexos/Listas/list-users/list-users.component';

import { GraficaComponent } from './@pages/layouts/Nexos/Componentes/grafica/grafica.component';
import { SettingVotationMenuComponent } from './@pages/layouts/Nexos/Componentes/setting-votation-menu/setting-votation-menu.component';
import { SetListEnableComponent } from './@pages/layouts/Nexos/Listas/set-list-enable/set-list-enable.component';
import { EditResidentialComponent } from './@pages/layouts/Nexos/Editar/edit-residential/edit-residential.component';
import { SearchActiveSetsComponent } from './@pages/layouts/Nexos/Componentes/search-active-sets/search-active-sets.component';
import { VotingMeetingSetupComponent } from './@pages/layouts/Nexos/Componentes/voting-meeting-setup/voting-meeting-setup.component';
// tslint:disable-next-line: max-line-length
import { PreregistrationMeetingSetupComponent } from './@pages/layouts/Nexos/Componentes/preregistration-meeting-setup/preregistration-meeting-setup.component';
// tslint:disable-next-line: max-line-length
import { VotiingAndPreregistrationComponent } from './@pages/layouts/Nexos/Componentes/votiing-and-preregistration/votiing-and-preregistration.component';
import { FilterPipe } from './@pages/layouts/Nexos/Componentes/post';
import { EditMeetingComponent } from './@pages/layouts/Nexos/Editar/edit-meeting/edit-meeting.component';
import { PointControlComponent } from './@pages/layouts/Nexos/Componentes/point-control/point-control.component';
// tslint:disable-next-line: max-line-length
import { PointControlMeetingActiveComponent } from './@pages/layouts/Nexos/Componentes/point-control-meeting-active/point-control-meeting-active.component';
import { EmailsIcloudComponent } from './@pages/layouts/Nexos/Listas/emails-icloud/emails-icloud.component';
import { CreateEmailIcloudComponent } from './@pages/layouts/Nexos/Componentes/create-email-icloud/create-email-icloud.component';
import { EditEmailsIcloudComponent } from './@pages/layouts/Nexos/Editar/edit-emails-icloud/edit-emails-icloud.component';
import { MenuConfigEmailComponent } from './@pages/layouts/Nexos/Componentes/menu-config-email/menu-config-email.component';
import { EditTypeEmailsComponent } from './@pages/layouts/Nexos/Editar/edit-type-emails/edit-type-emails.component';
import { CreateTypeEmailsComponent } from './@pages/layouts/Nexos/Componentes/create-type-emails/create-type-emails.component';
import { ChatComponent } from './@pages/layouts/Nexos/Componentes/chat/chat.component';
import { InterventionControlComponent } from './@pages/layouts/Nexos/Componentes/intervention-control/intervention-control.component';
import { EditMeetingDetailsComponent } from './@pages/layouts/Nexos/Editar/edit-meeting-details/edit-meeting-details.component';
import { AddunitsComponent } from './@pages/layouts/Nexos/Componentes/addunits/addunits.component';
import { SendMailComponent } from './@pages/layouts/Nexos/Componentes/send-mail/send-mail.component';
import { listResidentialBySendMail } from './@pages/layouts/Nexos/Componentes/listResidentialBySendMail/listResidentialBySendMail';
import { CustomerPresentComponent } from './@pages/layouts/Nexos/Componentes/customer-present/customer-present.component';
import { VisadoComponent } from './@pages/layouts/Nexos/Componentes/visado/visado.component';
import { TechnicalSupportComponent } from './@pages/layouts/Nexos/Componentes/technical-support/technical-support.component';
import { SupportComponent } from './@pages/layouts/Nexos/Componentes/support/support.component';
import { ListProfileVotationComponent } from './@pages/layouts/Nexos/Listas/list-profile-votation/list-profile-votation.component';
import { CreatProfileVotationComponent } from './@pages/layouts/Nexos/Componentes/creat-profile-votation/creat-profile-votation.component';
import { EditProfileVotationComponent } from './@pages/layouts/Nexos/Editar/edit-profile-votation/edit-profile-votation.component';
import { CreateVirtualVotesComponent } from './@pages/layouts/Nexos/Componentes/create-virtual-votes/create-virtual-votes.component';
import { SearchResidentialVotesComponent } from './@pages/layouts/Nexos/Componentes/search-residential-votes/search-residential-votes.component';
import { ListVoteByResidentialComponent } from './@pages/layouts/Nexos/Componentes/list-vote-by-residential/list-vote-by-residential.component';
import { EditVoteComponent } from './@pages/layouts/Nexos/Componentes/edit-vote/edit-vote.component';
import { CreateQrComponent } from './@pages/layouts/Nexos/Componentes/create-qr/create-qr.component';
//import { NgxQRCodeModule } from 'ngx-qrcode2';
import { UsersInRoomComponent } from './@pages/layouts/Nexos/Componentes/users-in-room/users-in-room.component';
import { UsersVotedInRoomComponent } from './@pages/layouts/Nexos/Componentes/users-voted-in-room/users-voted-in-room.component';
import { InRoomComponent } from './@pages/layouts/Nexos/Componentes/in-room/in-room.component';
import { OutRoomComponent } from './@pages/layouts/Nexos/Componentes/out-room/out-room.component';
import { TotalOutRoomComponent } from './@pages/layouts/Nexos/Componentes/total-out-room/total-out-room.component';
import { AddunitscontrolComponent } from './@pages/layouts/Nexos/Componentes/addunitscontrol/addunitscontrol.component';
import { CreatequestioncontrolComponent } from './@pages/layouts/Nexos/Componentes/createquestioncontrol/createquestioncontrol.component';
import { ChatControlComponent } from './@pages/layouts/Nexos/Componentes/chat-control/chat-control.component';
import { QuorumComponent } from './@pages/layouts/Nexos/Componentes/quorum/quorum.component';
import { VoteResultComponent } from './@pages/layouts/Nexos/Componentes/vote-result/vote-result.component';
import { CustomerControlComponent } from './@pages/layouts/Nexos/Componentes/customer-control/customer-control.component';
import { PendientesComponent } from './@pages/layouts/Nexos/Componentes/pendientes/pendientes.component';
import { UpdateDataComponent } from './@pages/layouts/Nexos/Componentes/update-data/update-data.component';
import { UpdateDataBaseComponent } from './@pages/layouts/Nexos/Componentes/update-data-base/update-data-base.component';
import { VoteResult2Component } from './@pages/layouts/Nexos/Componentes/vote-result2/vote-result2.component';
import { TransmisionComponent } from './@pages/layouts/Nexos/Componentes/transmision/transmision.component';
import { TaskComponent } from './@pages/layouts/Nexos/Componentes/task/task.component';
import { EditTaskComponent } from './@pages/layouts/Nexos/Componentes/edit-task/edit-task.component';
import { SearchUserTaskComponent } from './@pages/layouts/Nexos/Componentes/search-user-task/search-user-task.component';
import { UserWorkComponent } from './@pages/layouts/Nexos/Componentes/user-work/user-work.component';
import { CreateVoteComponent } from './@pages/layouts/Nexos/Componentes/create-vote/create-vote.component';
import { UnitsNotVotedComponent } from './@pages/layouts/Nexos/Componentes/units-not-voted/units-not-voted.component';
import { UnionMasiveComponent } from './@pages/layouts/Nexos/Componentes/union-masive/union-masive.component';
import { VerifyQuorumComponent } from './@pages/layouts/Nexos/Componentes/verify-quorum/verify-quorum.component';
import { UnionMasiveListComponent } from './@pages/layouts/Nexos/Componentes/union-masive-list/union-masive-list.component';
import { SearchClientComponent } from './@pages/layouts/Nexos/Componentes/searchclient/searchclient.component';
import { EditUnitsComponent } from './@pages/layouts/Nexos/Componentes/editunits/editunits.component';
import { ListCampaignWhatsappComponent } from './@pages/layouts/Nexos/Listas/list-campaign-whatsapp/list-campaign-whatsapp.component';
import { ListSendWhatsappComponent } from './@pages/layouts/Nexos/Listas/list-send-whatsapp/list-send-whatsapp.component';
import { GeneralSettingWhatsappComponent } from './@pages/layouts/Nexos/Componentes/general-setting-whatsapp/general-setting-whatsapp.component';
import { NumberListWhatsappComponent } from './@pages/layouts/Nexos/Listas/number-list-whatsapp/number-list-whatsapp.component';
import { FormToConfigurePhonesComponent } from './@pages/layouts/Nexos/Componentes/form-to-configure-phones/form-to-configure-phones.component';
import { CreateCampaignWhatsappComponent } from './@pages/layouts/Nexos/Componentes/create-campaign-whatsapp/create-campaign-whatsapp.component';
import { ListSendCampaignWhatsappComponent } from './@pages/layouts/Nexos/Listas/list-send-campaign-whatsapp/list-send-campaign-whatsapp.component';
import { SendCampaignWhatsappComponent } from './@pages/layouts/Nexos/service/send-campaign-whatsapp/send-campaign-whatsapp.component';
import { ListReportEmailMeetingComponent } from './@pages/layouts/Nexos/Listas/list-report-email-meeting/list-report-email-meeting.component';
import { SearchMeetingToReportComponent } from './search-meeting-to-report/search-meeting-to-report.component';
import { SideWhatsappComponent } from './@pages/layouts/Nexos/Componentes/side-whatsapp/side-whatsapp.component';
import { ChatWhatsappComponent } from './@pages/layouts/Nexos/Componentes/chat-whatsapp/chat-whatsapp.component';
import { TotalChatWhatsappComponent } from './@pages/layouts/Nexos/Componentes/total-chat-whatsapp/total-chat-whatsapp.component';
import { RegisterAssamblyMeetingWhatsappComponent } from './@pages/layouts/Nexos/Componentes/register-assambly-meeting-whatsapp/register-assambly-meeting-whatsapp.component';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { pgRetinaDirective } from './@pages/components/retina/retina.directive';
import {MatTabsModule} from '@angular/material/tabs';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AppRoutingModule } from './app-routing.module';
import { LayoutComponent } from '@ui';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

// Hammer Config Overide
// https:// github.com/angular/angular/issues/10541
@Injectable({providedIn: 'root'})
export class AppHammerConfig extends HammerGestureConfig {}

@NgModule({
  declarations: [
    CondensedComponent,
    CorporateLayout,
    SimplyWhiteLayout,
    ExecutiveLayout,
    CasualLayout,
    SidebarComponent,
    QuickviewComponent,
    SearchOverlayComponent,
    HeaderComponent,
    HorizontalMenuComponent,
    BlankComponent,
    RootLayout,
    CardsComponentPage,
    ViewsPageComponent,
    ChartsComponent,
    SocialComponent,
    StepsformDirective,
    CoverpageDirective,
    CondensedDashboardComponent,
    SimplyWhiteDashboardComponent,
    CasualDashboardComponent,
    CorporateDashboardComponent,
    ExecutiveDashboardComponent,
    BlankCorporateComponent,
    BlankSimplywhiteComponent,
    BlankCasualComponent,
    //LoginComponent,
    DashboardComponent,
    RecoverpasswordComponent,
    QuoteComponent,
    CreatequoteComponent,
    AdditemsComponent,
    CreateUsersComponent,
    CreateProfileComponent,
    ConfirmquotationComponent,
    EditUsersComponent,
    CreatePromotionComponent,
    EditPromotionComponent,
    PromotionListComponent,
    CreateItemsComponent,
    EditItemsComponent,
    ItemsListComponent,
    SettingsComponent,
    CreateQuotationrateComponent,
    QuotationrateListComponent,
    EditQuotationrateComponent,
    QuotehistoryComponent,
    CreateTextEmailComponent,
    TextEmailListComponent,
    EditTextEmailComponent,
    CreateCityComponent,
    CityListComponent,
    EditCityComponent,
    TracingComponent,
    CustomerQuoteHistoryComponent,
    TracingQuoteComponent,
    TracingReportComponent,
    ProfileEditComponent,
    ListProfileComponent,
    ListUsersComponent,
    GraficaComponent,
    SettingVotationMenuComponent,
    SetListEnableComponent,
    EditResidentialComponent,
    SearchActiveSetsComponent,
    VotingMeetingSetupComponent,
    PreregistrationMeetingSetupComponent,
    VotiingAndPreregistrationComponent,
    FilterPipe,
    EditMeetingComponent,
    PointControlComponent,
    PointControlMeetingActiveComponent,
    EmailsIcloudComponent,
    CreateEmailIcloudComponent,
    EditEmailsIcloudComponent,
    MenuConfigEmailComponent,
    EditTypeEmailsComponent,
    CreateTypeEmailsComponent,
    ChatComponent,
    InterventionControlComponent,
    EditMeetingDetailsComponent,
    AddunitsComponent,
    SendMailComponent,
    listResidentialBySendMail,
    CustomerPresentComponent,
    VisadoComponent,
    TechnicalSupportComponent,
    SupportComponent,
    ListProfileVotationComponent,
    CreatProfileVotationComponent,
    EditProfileVotationComponent,
    CreateVirtualVotesComponent,
    SearchResidentialVotesComponent,
    ListVoteByResidentialComponent,
    EditVoteComponent,
    CreateQrComponent,
    UsersInRoomComponent,
    UsersVotedInRoomComponent,
    InRoomComponent,
    OutRoomComponent,
    TotalOutRoomComponent,
    AddunitscontrolComponent,
    CreatequestioncontrolComponent,
    ChatControlComponent,
    QuorumComponent,
    VoteResultComponent,
    CustomerControlComponent,
    PendientesComponent,
    UpdateDataComponent,
    UpdateDataBaseComponent,
    VoteResult2Component,
    TransmisionComponent,
    TaskComponent,
    EditTaskComponent,
    SearchUserTaskComponent,
    UserWorkComponent,
    CreateVoteComponent,
    UnitsNotVotedComponent,
    UnionMasiveComponent,
    VerifyQuorumComponent,
    UnionMasiveListComponent,
    SearchClientComponent,
    EditUnitsComponent,
    ListCampaignWhatsappComponent,
    ListSendWhatsappComponent,
    GeneralSettingWhatsappComponent,
    NumberListWhatsappComponent,
    FormToConfigurePhonesComponent,
    CreateCampaignWhatsappComponent,
    ListSendCampaignWhatsappComponent,
    SendCampaignWhatsappComponent,
    ListReportEmailMeetingComponent,
    SearchMeetingToReportComponent,
    ChatWhatsappComponent,
    SideWhatsappComponent,
    TotalChatWhatsappComponent,
    RegisterAssamblyMeetingWhatsappComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    AppRoutingModule,
    //NvD3Module,
    pgRetinaDirective,
    NgxEchartsModule,
    NgxEchartsDirective,
    MatTabsModule,
    TabsModule.forRoot(),
    FormsModule,
    TypeaheadModule.forRoot(),
    // tslint:disable-next-line: deprecation
    //HttpModule,
    HttpClientModule,
    ProgressModule,
    pgListViewModule,
    pgCardModule,
    pgCardSocialModule,
    pgTabsModule,
    //IsotopeModule,
    //NgxDnDModule,
    QuillModule,
    pgSwitchModule,
    ReactiveFormsModule,
    EditorModule,
    
    LayoutComponent,
    // tslint:disable-next-line: deprecation
    //Select2Module,
    //NgxQRCodeModule,

    SweetAlert2Module.forRoot({
      //buttonsStyling: false,
      //customClass: 'modal-content',
      //confirmButtonClass: 'btn btn-primary',
      //cancelButtonClass: 'btn',
    }),
  ],
  providers: [
    DatePipe,
    pagesToggleService,
    Globals,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    provideAnimationsAsync(),
  ]
})
export class AppModule {}
