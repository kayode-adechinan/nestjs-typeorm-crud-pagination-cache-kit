import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ApiTags } from '@nestjs/swagger';
import { SearchItemArgsDto } from './dto/ search-item-args.dto';
import { ApiPaginatedResponse } from '../shared/decorators/api-paginated-response.decorator';
import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import { classToPlain, instanceToPlain, serialize } from 'class-transformer';
import { PageOptionsDto } from './dto/paginated-response.dto';

@ApiTags('Items')
@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemService.create(createItemDto);
  }

  @Get()
  //@ApiPaginatedResponse(Item)
  findAll(
    @Query() pageOptionsDto: PageOptionsDto,
    @Query() searchItemArgsDto: SearchItemArgsDto,
  ) {
    return this.itemService.findAll(searchItemArgsDto, pageOptionsDto);
  }
}
