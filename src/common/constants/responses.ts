/* eslint-disable @typescript-eslint/no-unsafe-assignment */
export class SuccessResponse<T = any> {
  statusCode: number;
  success: boolean;
  message: string;
  data?: T;

  constructor(message: string, data?: T, statusCode = 200) {
    this.statusCode = statusCode;
    this.success = true;
    this.message = message;
    this.data = data;
  }
}

export class ErrorResponse {
  statusCode: number;
  success: boolean;
  message: string;
  error: any;

  constructor(message: string, error: any, statusCode = 400) {
    this.statusCode = statusCode;
    this.success = false;
    this.message = message;
    this.error = error;
  }
}
