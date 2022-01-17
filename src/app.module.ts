import { Module } from '@nestjs/common';
import { ItemModule } from './item/item.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from './shared/shared.module';

import config from '../ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(config), ItemModule, SharedModule],
})
export class AppModule {}
