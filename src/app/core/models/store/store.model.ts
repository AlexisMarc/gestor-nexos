import {
  basicValue,
  MeetingWelcome,
  RegisterDataConfig,
  RegisterDataCustomize,
  RegisterDataDesign,
  RegisterForm,
  resident,
} from '@models';

export interface AppStore {
  register: StatusRegister;
  clientRegister: StatusClientRegister
}
export interface StatusRegister {
  meeting_id: undefined | number;
  residential: undefined | resident;
  config: undefined | RegisterDataConfig;
  customize: undefined | RegisterDataCustomize;
  design: undefined | RegisterDataDesign;
  dynamicForm: undefined | RegisterForm;
  emailTemplate: basicValue[] | undefined;
  whatsAppTemplate: basicValue[] | undefined;
  typesEvent: basicValue[] | undefined;
}

export interface StatusClientRegister {
  welcome: MeetingWelcome | undefined;
}