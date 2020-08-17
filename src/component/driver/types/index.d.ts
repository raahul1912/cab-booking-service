declare module Driver {
  export interface DriverType {
    driver_id?: number;
    driver_name?: string;
    phone?: string;
    email?: string;
    password?: string;
  }
}

export = Driver;
