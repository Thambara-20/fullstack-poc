import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto, UpdateMenuDto } from './menu.dto';

@Controller('menus')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  getMenus() {
    return this.menuService.getMenus();
  }

  @Get(':id')
  getMenuById(@Param('id') id: string) {
    return this.menuService.getMenuById(id);
  }

  @Post()
  createMenu(@Body() data: CreateMenuDto) {
    return this.menuService.createMenu(data);
  }

  @Put(':id')
  updateMenu(@Param('id') id: string, @Body() data: UpdateMenuDto) {
    return this.menuService.updateMenu(id, data);
  }

  @Delete(':id')
  deleteMenu(@Param('id') id: string) {
    return this.menuService.deleteMenu(id);
  }
}
