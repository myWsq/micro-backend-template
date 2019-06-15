import { HttpException, HttpStatus } from "@nestjs/common";

export interface ValidationExceptionPayload {
  field: string;
  code: "missing" | "alreadyExists" | "invalid";
  detail?: any;
}

export class ValidationException extends HttpException {
  constructor(payload: ValidationExceptionPayload[]) {
    super(
      {
        message: "Validation Failed",
        errors: payload,
      },
      HttpStatus.UNPROCESSABLE_ENTITY
    );
  }
}
