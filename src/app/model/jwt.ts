import { Authority } from "./authority";

export interface Jwt {

  sub: string;
  auth: Authority[];
  iat: Date;
  exp: Date;

}

