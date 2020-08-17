declare module User {
  export interface UserType {
    user_id?: number;
    user_name?: string;
    phone?: string;
    email?: string;
    password?: string;
  }
}

export = User;
