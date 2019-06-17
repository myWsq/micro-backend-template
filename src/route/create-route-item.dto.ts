import { IsString } from "class-validator";
export class CreateRouteItemDto {
  @IsString()
  path: string;
  @IsString()
  componentPath: string;
}
