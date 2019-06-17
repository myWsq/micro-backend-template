import { IsString } from "class-validator";

export class SetLayoutDto {
  @IsString()
  path: string;
}
