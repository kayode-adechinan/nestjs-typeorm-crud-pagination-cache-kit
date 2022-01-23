import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

import { SearchItemArgsDto } from './dto/ search-item-args.dto';
import { Item } from '@prisma/client';
import { PrismaService } from '../database/prisma.service';
import {
  PageOptionsDto,
  PageMetaDto,
  PaginatedResponseDto,
} from './dto/paginated-response.dto';
import { plainToClass, plainToInstance } from 'class-transformer';
import { ItemDto } from './dto/item.dto';

// https://tkssharma.com/nestjs-crud-using-typeorm-and-mysql/

@Injectable()
export class ItemService {
  constructor(private prisma: PrismaService) {}

  async create(createItemDto: CreateItemDto) {
    return this.prisma.item.create({
      data: {
        ...createItemDto,
      },
    });
  }

  async findAll(
    searchItemArgsDto: SearchItemArgsDto,
    pageOptionsDto: PageOptionsDto,
  ) {
    const { searchTerm } = searchItemArgsDto;

    const result = await this.prisma.item.findMany({});

    // const items = plainToInstance(ItemDto, result, {
    //   excludeExtraneousValues: true,
    // });

    const items = plainToInstance(ItemDto, result);

    const pageMetaDto = new PageMetaDto(1, 10, 10);

    return new PaginatedResponseDto(items, pageMetaDto);

    //return this.prisma.item.findMany({});
  }
}
