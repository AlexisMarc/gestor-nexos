import { Routes } from '@angular/router';

import {
  CondensedComponent
} from './@pages/layouts';

import { CondensedDashboardComponent } from './dashboard/condensed/dashboard.component';
import { LoginComponent } from './@pages/layouts/Nexos/Componentes/login/login.component';
import { DashboardComponent } from './@pages/layouts/Nexos/Componentes/dashboard/dashboard.component';
import { RecoverpasswordComponent } from './@pages/layouts/Nexos/Componentes/recoverpassword/recoverpassword.component';
import { QuoteComponent } from './@pages/layouts/Nexos/Componentes/quote/quote.component';
import { CreatequoteComponent } from './@pages/layouts/Nexos/Componentes/createquote/createquote.component';
import { AdditemsComponent } from './@pages/layouts/Nexos/Componentes/additems/additems.component';
import { CreateUsersComponent } from './@pages/layouts/Nexos/Componentes/create-users/create-users.component';
import { CreateProfileComponent } from './@pages/layouts/Nexos/Componentes/create-profile/create-profile.component';
import { ConfirmquotationComponent } from './@pages/layouts/Nexos/Componentes/confirmquotation/confirmquotation.component';
import { EditUsersComponent } from './@pages/layouts/Nexos/Editar/edit-users/edit-users.component';
import { ItemsListComponent } from './@pages/layouts/Nexos/Listas/items-list/items-list.component';
import { CreatePromotionComponent } from './@pages/layouts/Nexos/Componentes/create-promotion/create-promotion.component';
import { CreateItemsComponent } from './@pages/layouts/Nexos/Componentes/create-items/create-items.component';
import { EditItemsComponent } from './@pages/layouts/Nexos/Editar/edit-items/edit-items.component';
import { EditPromotionComponent } from './@pages/layouts/Nexos/Editar/edit-promotion/edit-promotion.component';
import { PromotionListComponent } from './@pages/layouts/Nexos/Listas/promotion-list/promotion-list.component';
import { SettingsComponent } from './@pages/layouts/Nexos/Componentes/settings/settings.component';
import { CreateQuotationrateComponent } from './@pages/layouts/Nexos/Componentes/create-quotationrate/create-quotationrate.component';
import { QuotationrateListComponent } from './@pages/layouts/Nexos/Listas/quotationrate-list/quotationrate-list.component';
import { EditQuotationrateComponent } from './@pages/layouts/Nexos/Editar/edit-quotationrate/edit-quotationrate.component';
import { QuotehistoryComponent } from './@pages/layouts/Nexos/Componentes/quotehistory/quotehistory.component';
import { CreateTextEmailComponent } from './@pages/layouts/Nexos/Componentes/create-text-email/create-text-email.component';
import { TextEmailListComponent } from './@pages/layouts/Nexos/Listas/text-email-list/text-email-list.component';
import { EditTextEmailComponent } from './@pages/layouts/Nexos/Editar/edit-text-email/edit-text-email.component';
import { CreateCityComponent } from './@pages/layouts/Nexos/Componentes/create-city/create-city.component';
import { CityListComponent } from './@pages/layouts/Nexos/Listas/city-list/city-list.component';
import { EditCityComponent } from './@pages/layouts/Nexos/Editar/edit-city/edit-city.component';
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
import { EditMeetingComponent } from './@pages/layouts/Nexos/Editar/edit-meeting/edit-meeting.component';
import { PointControlComponent } from './@pages/layouts/Nexos/Componentes/point-control/point-control.component';
// tslint:disable-next-line: max-line-length
import { PointControlMeetingActiveComponent } from './@pages/layouts/Nexos/Componentes/point-control-meeting-active/point-control-meeting-active.component';
import { EmailsIcloudComponent } from './@pages/layouts/Nexos/Listas/emails-icloud/emails-icloud.component';
import { CreateEmailIcloudComponent } from './@pages/layouts/Nexos/Componentes/create-email-icloud/create-email-icloud.component';
import { EditEmailsIcloudComponent } from './@pages/layouts/Nexos/Editar/edit-emails-icloud/edit-emails-icloud.component';
import { MenuConfigEmailComponent } from './@pages/layouts/Nexos/Componentes/menu-config-email/menu-config-email.component';
import { CreateTypeEmailsComponent } from './@pages/layouts/Nexos/Componentes/create-type-emails/create-type-emails.component';
import { EditTypeEmailsComponent } from './@pages/layouts/Nexos/Editar/edit-type-emails/edit-type-emails.component';
import { InterventionControlComponent } from './@pages/layouts/Nexos/Componentes/intervention-control/intervention-control.component';
import { ChatComponent } from './@pages/layouts/Nexos/Componentes/chat/chat.component';
import { EditMeetingDetailsComponent } from './@pages/layouts/Nexos/Editar/edit-meeting-details/edit-meeting-details.component';
import { AddunitsComponent } from './@pages/layouts/Nexos/Componentes/addunits/addunits.component';
import { SendMailComponent } from './@pages/layouts/Nexos/Componentes/send-mail/send-mail.component';
import { listResidentialBySendMail } from './@pages/layouts/Nexos/Componentes/listResidentialBySendMail/listResidentialBySendMail';
import { CustomerPresentComponent } from './@pages/layouts/Nexos/Componentes/customer-present/customer-present.component';
import { VisadoComponent } from './@pages/layouts/Nexos/Componentes/visado/visado.component';
import { TechnicalSupportComponent } from './@pages/layouts/Nexos/Componentes/technical-support/technical-support.component';
import { SupportComponent } from './@pages/layouts/Nexos/Componentes/support/support.component';
import { ListProfileVotationComponent } from './@pages/layouts/Nexos/Listas/list-profile-votation/list-profile-votation.component';
import { EditProfileVotationComponent } from './@pages/layouts/Nexos/Editar/edit-profile-votation/edit-profile-votation.component';
import { CreateVirtualVotesComponent } from './@pages/layouts/Nexos/Componentes/create-virtual-votes/create-virtual-votes.component';
// tslint:disable-next-line: max-line-length
import { SearchResidentialVotesComponent } from './@pages/layouts/Nexos/Componentes/search-residential-votes/search-residential-votes.component';
import { CreatProfileVotationComponent } from './@pages/layouts/Nexos/Componentes/creat-profile-votation/creat-profile-votation.component';
// tslint:disable-next-line: max-line-length
import { ListVoteByResidentialComponent } from './@pages/layouts/Nexos/Componentes/list-vote-by-residential/list-vote-by-residential.component';
import { EditVoteComponent } from './@pages/layouts/Nexos/Componentes/edit-vote/edit-vote.component';
import { CreateQrComponent } from './@pages/layouts/Nexos/Componentes/create-qr/create-qr.component';
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
import { UserWorkComponent } from './@pages/layouts/Nexos/Componentes/user-work/user-work.component';
import { SearchUserTaskComponent } from './@pages/layouts/Nexos/Componentes/search-user-task/search-user-task.component';
import { UnionMasiveListComponent } from './@pages/layouts/Nexos/Componentes/union-masive-list/union-masive-list.component';
import { UnionMasiveComponent } from './@pages/layouts/Nexos/Componentes/union-masive/union-masive.component';
import { EditUnitsComponent } from './@pages/layouts/Nexos/Componentes/editunits/editunits.component';
import { SearchClientComponent } from './@pages/layouts/Nexos/Componentes/searchclient/searchclient.component';
import { ListCampaignWhatsappComponent } from './@pages/layouts/Nexos/Listas/list-campaign-whatsapp/list-campaign-whatsapp.component';
import { ListSendWhatsappComponent } from './@pages/layouts/Nexos/Listas/list-send-whatsapp/list-send-whatsapp.component';
import { GeneralSettingWhatsappComponent } from './@pages/layouts/Nexos/Componentes/general-setting-whatsapp/general-setting-whatsapp.component';
import { NumberListWhatsappComponent } from './@pages/layouts/Nexos/Listas/number-list-whatsapp/number-list-whatsapp.component';
import { FormToConfigurePhonesComponent } from './@pages/layouts/Nexos/Componentes/form-to-configure-phones/form-to-configure-phones.component'
import { CreateCampaignWhatsappComponent } from './@pages/layouts/Nexos/Componentes/create-campaign-whatsapp/create-campaign-whatsapp.component';
import { ListSendCampaignWhatsappComponent } from './@pages/layouts/Nexos/Listas/list-send-campaign-whatsapp/list-send-campaign-whatsapp.component';
import { SendCampaignWhatsappComponent } from './@pages/layouts/Nexos/service/send-campaign-whatsapp/send-campaign-whatsapp.component';
import { ListReportEmailMeetingComponent } from './@pages/layouts/Nexos/Listas/list-report-email-meeting/list-report-email-meeting.component';
import { SearchMeetingToReportComponent } from './search-meeting-to-report/search-meeting-to-report.component';
import { TotalChatWhatsappComponent } from './@pages/layouts/Nexos/Componentes/total-chat-whatsapp/total-chat-whatsapp.component';
import { RegisterAssamblyMeetingWhatsappComponent } from './@pages/layouts/Nexos/Componentes/register-assambly-meeting-whatsapp/register-assambly-meeting-whatsapp.component';


export const AppRoutes: Routes = [

  { path: '', component: LoginComponent },
  { path: 'recover', component: RecoverpasswordComponent },
  {
    path: 'home', component: CondensedComponent, children: [
      { path: 'chat-whatsapp', component: TotalChatWhatsappComponent},
      { path: 'dashboard', component: CondensedDashboardComponent },
      { path: 'additems/:id/:id_quote', component: AdditemsComponent },
      { path: '', component: DashboardComponent },
      { path: 'quote', component: QuoteComponent },
      { path: 'createquote/:id/:id_quote', component: CreatequoteComponent },
      { path: 'createuser', component: CreateUsersComponent },
      { path: 'createprofile', component: CreateProfileComponent },
      { path: 'confirmquote', component: ConfirmquotationComponent },
      { path: 'createTextEmail', component: CreateTextEmailComponent },
      { path: 'createPromotion', component: CreatePromotionComponent },
      { path: 'createItems', component: CreateItemsComponent },
      { path: 'createRate', component: CreateQuotationrateComponent },
      { path: 'quoteHistory/:id', component: QuotehistoryComponent },
      { path: 'createCity', component: CreateCityComponent },
      { path: 'customerQuoteHistory', component: CustomerQuoteHistoryComponent },
      { path: 'tracing', component: TracingComponent },
      { path: 'tracingQuote/:id_quote/:id_residential', component: TracingQuoteComponent },
      { path: 'tracingReport', component: TracingReportComponent },
      { path: 'customerQuoteHistory/:id', component: CustomerQuoteHistoryComponent },
      { path: 'searchSets', component: SearchActiveSetsComponent },
      { path: 'grafica', component: GraficaComponent },
      { path: 'votingMeeting/:idResidential/:nameResidential', component: VotingMeetingSetupComponent },
      { path: 'preregistration/:idResidential', component: PreregistrationMeetingSetupComponent },
      { path: 'votingAndPreregistration/:idResidential', component: VotiingAndPreregistrationComponent },
      { path: 'pointControl', component: PointControlComponent },
      { path: 'pointControlMeeting/:idResidential', component: PointControlMeetingActiveComponent },
      { path: 'createEmailIcloud', component: CreateEmailIcloudComponent },
      { path: 'createtypeEmails', component: CreateTypeEmailsComponent },
      { path: 'editar_base_list', component: UpdateDataComponent },
      { path: 'editar_base/:idResidential', component: UpdateDataBaseComponent },
      { path: 'tareas', component: TaskComponent },
      { path: 'usuariosActivos', component: UserWorkComponent },
      { path: 'buscarTareasPorUsuario', component: SearchUserTaskComponent },
      { path: 'editartarea/:id', component: EditTaskComponent},
      { path: 'sendcampaignwhatsapp', component: SendCampaignWhatsappComponent},
      { path: 'searchtoreport', component: SearchMeetingToReportComponent},

      


      { path: '', component: EditTaskComponent},
      {
        path: 'interventioncontrol/:idResidential', component: InterventionControlComponent, children: [
          { path: 'addunits/:idResidential/:idMeeting', component: AddunitscontrolComponent },
          { path: 'crearVotacion/:idResidential/:idMeeting', component: CreatequestioncontrolComponent },
          { path: 'cargardocumentos/:idResidential/:idMeeting', component: EditMeetingComponent },
          { path: 'chat/:idResidential/:idMeeting', component: ChatControlComponent },
          { path: 'listaVotaciones/:idResidential/:idMeeting', component: ListVoteByResidentialComponent },
          { path: 'usuariosVotantesEnSala/:idResidential/:idMeeting/:idVote', component: UsersVotedInRoomComponent },
          { path: 'editaVotacion/:idResidential/:idVote/:idMeeting', component: EditVoteComponent },
          { path: 'quorum/:idResidential/:idMeeting/:showVerify', component: QuorumComponent },
          { path: 'votaciones/:idResidential/:idMeeting', component: VoteResultComponent },
          { path: 'pendientes/:idResidential/:idMeeting/:idVote', component: PendientesComponent },
        ]
      },

      { path: 'sendEmail/:idResidential', component: SendMailComponent },
      { path: 'listResidentialBySenMail', component: listResidentialBySendMail },
      { path: 'Ausentes/:idResidential/:idMeeting', component: CustomerPresentComponent },
      { path: 'Soporte', component: TechnicalSupportComponent },
      {
        path: 'SoporteTelefonico/:idResidential', component: SupportComponent, children: [
          { path: 'usuarios/:idResidential/:idMeeting', component: CustomerControlComponent },
          { path: 'quorum/:idResidential/:idMeeting/:showVerify', component: QuorumComponent },
          { path: 'votaciones/:idResidential/:idMeeting', component: VoteResult2Component },
        ]
      },
      { path: 'crearVotacion/:idResidential', component: CreateVirtualVotesComponent },
      { path: 'buscarConjunto', component: SearchResidentialVotesComponent },
      { path: 'crearPerfilesVotacion', component: CreatProfileVotationComponent },
      { path: 'crearQr/:idResidential/:idMeeting', component: CreateQrComponent },
      { path: 'UsuariosEnSala/:idResidential/:idMeeting', component: UsersInRoomComponent },
      { path: 'entradaSala/:idResidential/:idMeeting', component: InRoomComponent },
      { path: 'salidaSala/:idResidential/:idMeeting', component: OutRoomComponent },
      { path: 'salidaTotalSala/:idResidential/:idMeeting', component: TotalOutRoomComponent },
      { path: 'transmision/:idResidential', component: TransmisionComponent },
      { path: 'unionMasive/:idResidential/:nameResidential', component: UnionMasiveComponent },

      // listas
      { path: 'userlist', component: ListUsersComponent },
      { path: 'profilelist', component: ListProfileComponent },
      { path: 'Promotionlist', component: PromotionListComponent },
      { path: 'itemslist', component: ItemsListComponent },
      { path: 'qutationratelist', component: QuotationrateListComponent },
      { path: 'textEmailList', component: TextEmailListComponent },
      { path: 'cityList', component: CityListComponent },
      { path: 'setListEnable', component: SetListEnableComponent },
      { path: 'emailIcloud', component: EmailsIcloudComponent },
      { path: 'listProfileVotation', component: ListProfileVotationComponent },
      { path: 'unionMasiveList', component: UnionMasiveListComponent },
      { path: 'campaignlist', component: ListCampaignWhatsappComponent },
      { path: 'sendwhatsapplist', component: ListSendWhatsappComponent },
      { path: 'numberlistWhatsapp', component: NumberListWhatsappComponent },
      { path: 'listsendcampaignwhastapp', component: ListSendCampaignWhatsappComponent },
      { path: 'listreportemails', component: ListReportEmailMeetingComponent },


      // edit
      { path: 'editProfiles/:idProfile', component: ProfileEditComponent },
      { path: 'editUsers/:idUser', component: EditUsersComponent },
      { path: 'editPromotion/:idDiscount', component: EditPromotionComponent },
      { path: 'editItems/:idItem', component: EditItemsComponent },
      { path: 'editQuotationRate/:id_TypeQuote', component: EditQuotationrateComponent },
      { path: 'editTextEmail/:idTextEmail', component: EditTextEmailComponent },
      { path: 'editCity/:idCity', component: EditCityComponent },
      { path: 'editResidential/:uuid_code', component: EditResidentialComponent },
      { path: 'editEmailsIcloud/:idEmail', component: EditEmailsIcloudComponent },
      { path: 'editTypeEmails', component: EditTypeEmailsComponent },
      { path: 'editMeeting/:idResidential', component: EditMeetingDetailsComponent },
      { path: 'addunits/:idResidential/:idMeeting', component: AddunitsComponent },
      { path: 'editProfilesVotation/:idProfileVotes', component: EditProfileVotationComponent },
      { path: 'cargardocumentos/:idResidential/:idMeeting', component: EditMeetingComponent },
      { path: 'editUnits/:idResidential', component: EditUnitsComponent },
      { path: 'searchClient', component: SearchClientComponent },

      //  menu edit
      { path: 'menusetting', component: SettingsComponent },
      { path: 'menusettingVoting', component: SettingVotationMenuComponent },
      { path: 'menusettingEmail', component: MenuConfigEmailComponent },
      { path: 'chat/:id', component: ChatComponent },
      { path: 'visado/:id', component: VisadoComponent },

        //Whatsapp
        { path: 'formphonewhatsapp', component: FormToConfigurePhonesComponent},
        { path: 'generalsettingwhastapp', component: GeneralSettingWhatsappComponent},
        { path: 'createcampaign', component: CreateCampaignWhatsappComponent},
        { path: 'registervotewhatsapp/:idResidential', component: RegisterAssamblyMeetingWhatsappComponent},

        

    ]
  },
];
