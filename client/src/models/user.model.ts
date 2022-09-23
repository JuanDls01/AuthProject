import { Roles } from "./roles";

export interface UserInfo {
    // token: string,
    // refresh_token: string,
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    group: Roles;
}