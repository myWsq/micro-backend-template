import { IsString, ValidateNested, IsDefined } from "class-validator";
import { CreateRouteComponentDto } from "./create-route-component.dto";
import { Type } from "class-transformer";
export class CreateRouteItemDto {
  @IsString()
  path: string;
  @IsDefined()
  @ValidateNested()
  @Type(() => CreateRouteComponentDto)
  component: CreateRouteComponentDto;
}
