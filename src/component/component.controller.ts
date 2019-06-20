import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Param,
  Delete,
  Query,
  ForbiddenException
} from "@nestjs/common";
import { CreateComponentDto } from "./create-component.dto";
import { ComponentService } from "./component.service";
import { ValidationException } from "../../exception/validation.exception";

@Controller("component")
export class ComponentController {
  constructor(private readonly componentService: ComponentService) {}
  private async _isComponentExist(id: number) {
    const component = await this.componentService.getOneComponent(id);
    if (!component) {
      throw new ValidationException([
        {
          field: "id",
          code: "missing"
        }
      ]);
    } else {
      return component;
    }
  }
  @Get()
  async getComponents() {
    return this.componentService.getComponents();
  }
  @Post()
  async createComponent(@Body() createComponentDto: CreateComponentDto) {
    if (
      await this.componentService.getComponentByPath(createComponentDto.path)
    ) {
      throw new ValidationException([
        {
          field: "path",
          code: "alreadyExists"
        }
      ]);
    }
    return this.componentService.createComponent(createComponentDto);
  }
  @Put(":id")
  async updateComponent(
    @Param("id") id: number,
    @Body() updateComponentDto: CreateComponentDto
  ) {
    await this._isComponentExist(id);
    return this.componentService.updateComponent(id, updateComponentDto);
  }
  @Delete(":id")
  async deleteComponent(
    @Param("id") id: number,
    @Query("force") force: boolean
  ) {
    await this._isComponentExist(id);
    const count = await this.componentService.getComponentUsedCount(id);
    if (count !== 0 && !force) {
      throw new ForbiddenException(
        `Component is used by ${count} entities currently`
      );
    }else {
      this.componentService.deleteComponent(id)
    }
  }
}
