export interface QueueRequest {
  id?: string,
  user?: string,
  establishment?: string,
  position_in_queue?: string,
  waiting_time?: string,
  coordinates?: object,
  status?: string
}