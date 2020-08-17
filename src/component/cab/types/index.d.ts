import Cab from '../schemas/cab.schema';

declare module Cab {
  export interface CabType {
    cab_id?: number;
    driver_id?: number;
    cab_no?: string;
    cab_lat?: number;
    cab_lng?: number;
    on_trip?: number;
  }
}

export = Cab;
