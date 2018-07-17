export interface IUser {
    id: number,
    alias: string,
    email: string,
    password?: string,
    salt?: string
  }