declare module Ride {
  export interface RideType {
    ride_id?: number;
    driver_id?: number;
    user_id?: number;
    src_lat?: number;
    src_lng?: number;
    dest_lat?: number;
    dest_lng?: number;
    fare?: number;
    status?: number;
  }
}

export = Ride;
