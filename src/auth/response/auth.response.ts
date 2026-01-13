import { UserResponse } from 'src/user/reponse/user.response';
import { TokenResponse } from 'src/auth/response/token.response';

export class AuthResponse {
  user: UserResponse;
  serverTokens: TokenResponse;

  static fromModel(
    user: UserResponse,
    serverTokens: TokenResponse,
  ): AuthResponse {
    return {
      user,
      serverTokens,
    } as AuthResponse;
  }
}
