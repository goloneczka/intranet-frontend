
export interface Jwt {

  sub: string;
  auth: string[];
  iat: Date;
  exp: Date;

}
