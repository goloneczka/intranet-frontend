export class LocalStorageService {

  private static JWT = 'JWT'

  static storeJwt(textJwt: string): void {
    localStorage.setItem(this.JWT, textJwt);
  }

  static getJwt(): string | null {
    return localStorage.getItem(this.JWT);
  }

  static isAuthenticated() : boolean{
    return !!this.getJwt();
  }

  static clearJwt() {
    localStorage.removeItem(this.JWT)
  }
}
