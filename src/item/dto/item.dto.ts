import { Exclude, Expose } from 'class-transformer';

export class ItemDto {
  //@Exclude()
  @Expose()
  title: string;
  //   constructor(title: string) {
  //     this.title = title;
  //   }
}
