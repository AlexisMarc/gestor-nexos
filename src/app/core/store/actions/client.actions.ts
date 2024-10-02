import { MeetingWelcome } from "@models";
import { createAction, props } from "@ngrx/store";

export const DataWelcome = createAction(
    '[Client] data Welcome',
    props<{ data: MeetingWelcome | undefined }>()
  );