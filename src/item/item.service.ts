import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { FindConditions, ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import {
  PageMetaDto,
  PageOptionsDto,
  PaginatedResponseDto,
} from '../shared/dto/paginated-response.dto';
import { SearchItemArgsDto } from './dto/ search-item-args.dto';

// https://tkssharma.com/nestjs-crud-using-typeorm-and-mysql/

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
  ) {}

  async create(createItemDto: CreateItemDto) {
    const item = this.itemRepository.create(createItemDto);
    return this.itemRepository.save(item);
  }

  async findAll(
    searchItemArgsDto: SearchItemArgsDto,
    pageOptionsDto: PageOptionsDto,
  ) {
    const { searchTerm } = searchItemArgsDto;

    let condition: FindConditions<Item> = {};

    if (searchTerm) {
      condition = { ...condition, title: ILike(`%${searchTerm}%`) };
    }

    const [items, itemCount] = await this.itemRepository.findAndCount({
      where: condition,
      order: {
        updatedAt: 'DESC',
      },
      skip: pageOptionsDto.skip,
      take: pageOptionsDto.take,
    });
    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });
    return new PaginatedResponseDto(items, pageMetaDto);
  }

  async findOne(id: number) {
    return this.itemRepository.findOne({ where: { id: id } });
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    await this.itemRepository.update({ id }, updateItemDto);
    return this.itemRepository.findOne({ id });
  }

  async remove(id: number) {
    await this.itemRepository.delete({ id });
    return { deleted: true };
  }
}
