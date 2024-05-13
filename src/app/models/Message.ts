import { Timestamp } from "firebase/firestore";

export interface Message {
  text: string;
  user: string;
  timestamp: Timestamp;
}
  