import { IsNumber } from "class-validator";

export class SetLayoutDto {
  @IsNumber()
  id: number;
}
