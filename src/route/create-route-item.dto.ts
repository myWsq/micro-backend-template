import { IsString, IsNumber, IsDefined } from "class-validator";
export class CreateRouteItemDto {
  @IsString()
  path: string;
  @IsNumber()
  componentId: number;
}
