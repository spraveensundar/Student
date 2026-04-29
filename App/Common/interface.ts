


export interface axiosRequest {
  method: string;
  url: string;
  params?: Record<string, any>;
  data?: Record<string, any>;
  headers?: Record<string, string>;
}

export interface updateUserDataInterface {
  token: string;
  userDetail: object;
  secretKey: string;
}

export interface onLocationCoordsInterface {
  latitude: number;
  longitude: number;
}
