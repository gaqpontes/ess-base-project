export interface IUser {
    name: string;
    phoneNumber: string;
    password: string;
    birthday: Date;
    _id: string;
}
export interface ILoginCredentials {
    phoneNumber: string;
    password: string;
}
export interface IResetPasswordData {
    phoneNumber: string;
    birthday: string;
    newPassword: string;
}