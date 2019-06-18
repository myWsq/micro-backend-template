import { Controller, Get, NotFoundException, Post, Body } from "@nestjs/common";
import { LayoutService } from "./layout.service";
import { ComponentService } from "../component/component.service";
import { SetLayoutDto } from "./set-layout.dto";
import { ValidationException } from "../../exception/validation.exception";

@Controller("layout")
export class LayoutController {
  constructor(
    private readonly layoutService: LayoutService,
    private readonly componentService: ComponentService
  ) {}
  @Get()
  async getLayoutComponent() {
    const component = await this.layoutService.getLayoutComponent();
    if (!component) {
      throw new NotFoundException("Layout component not found");
    }
    return component;
  }

  @Post()
  async setLayoutComponent(@Body() setLayoutDto: SetLayoutDto) {
    const component = await this.componentService.getOneComponent(
      setLayoutDto.id
    );
    if (!component) {
      throw new ValidationException([
        {
          field: "id",
          code: "missing"
        }
      ]);
    }
    return this.layoutService.setLayoutComponent(component);
  }
}
