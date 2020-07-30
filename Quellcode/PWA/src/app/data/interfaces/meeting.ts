import { MeetingInfo } from './meeting-info';

export interface Meeting {
  // ID of the meeting
  id?: string;
  // ID of the creator
  userId?: string;
  // Information of the meeting => deadline, datetime, location, activity
  info: MeetingInfo;
  // forename and name of the creator
  fullname?: string;
  // subscriber of the meeting
  subscriber?: Array<string>;
}
