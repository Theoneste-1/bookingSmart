export interface JwtPayload {
    email: string;
  }
  
  export interface LoginStatus {
    accessToken: string;
    refreshToken: string;
  }
  
  export interface RefreshTokenDto {
    refreshToken: string;
  }
  
  export interface TokenResponse {
    accessToken: string;
    refreshToken: string;
  }
  