import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMenuDto, UpdateMenuDto } from './menu.dto';

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) {}

  async getMenus() {
    return this.prisma.menu.findMany({ include: { children: true } });
  }

  async getMenuById(id: string) {
    return this.prisma.menu.findUnique({
      where: { id },
      include: { children: true },
    });
  }

  async createMenu(data: CreateMenuDto) {
    return this.prisma.menu.create({ data });
  }

  async updateMenu(id: string, data: UpdateMenuDto) {
    return this.prisma.menu.update({ where: { id }, data });
  }

  async deleteMenu(id: string) {
    return this.prisma.menu.delete({ where: { id } });
  }
}
