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
import { PageOptionsDto } from '../shared/dto/paginated-response.dto';
import { SearchItemArgsDto } from './dto/ search-item-args.dto';
import { ApiPaginatedResponse } from '../shared/decorators/api-paginated-response.decorator';
import { Item } from './entities/item.entity';
import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';

@ApiTags('Items')
@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemService.create(createItemDto);
  }

  @Get()
  @ApiPaginatedResponse(Item)
  findAll(
    @Query() pageOptionsDto: PageOptionsDto,
    @Query() searchItemArgsDto: SearchItemArgsDto,
  ) {
    return this.itemService.findAll(searchItemArgsDto, pageOptionsDto);
  }

  @Get(':id')
  @ApiException(() => NotFoundException, {
    description: 'Not found',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.itemService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateItemDto: UpdateItemDto,
  ) {
    return this.itemService.update(id, updateItemDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.itemService.remove(id);
  }
}
