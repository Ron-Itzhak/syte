import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatalogsModule } from './catalogs/catalogs.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ScheduleService } from './schedule/schedule.service';
import { CatalogsService } from './catalogs/catalogs.service';
import { MongoModule } from './shared/mongo/mongo.module';

@Module({
  imports: [CatalogsModule, ScheduleModule.forRoot(), MongoModule],
  controllers: [AppController],
  providers: [AppService, ScheduleService, CatalogsService],
})
export class AppModule {}
