import { handleRequest } from "../../lib/helpers/requestHandler/handle-request";
import { HelperService } from "../../services/helper";
import { Login, LoginResponse, UserRoot } from "../../types";



class AuthService extends HelperService {
  // private baseAuth = "/auth";
  private loginEndpoint = `/login`;
  private me = `/users/profile`;

  public async login(requestBody: Partial<Login>): Promise<LoginResponse> {
    return handleRequest(
      this.post<LoginResponse, Partial<Login>>(this.loginEndpoint, requestBody)
    );
  }

  public async getUser(): Promise<UserRoot> {
    console.log(this.me);
    return handleRequest(this.post<UserRoot, undefined>(this.me, undefined));
  }
}

export const authService = new AuthService();
