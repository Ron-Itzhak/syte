import { Module } from '@nestjs/common';
import { CatalogsService } from './catalogs.service';
import { CatalogsController } from './catalogs.controller';
import { MongoModule } from 'src/shared/mongo/mongo.module';

@Module({
  imports: [MongoModule],

  providers: [CatalogsService],
  controllers: [CatalogsController],
})
export class CatalogsModule {}
