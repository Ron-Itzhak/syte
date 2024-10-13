import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CatalogsService } from 'src/catalogs/catalogs.service';

@Injectable()
export class ScheduleService {
  private readonly logger = new Logger(ScheduleService.name);

  constructor(private readonly catalogService: CatalogsService) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleCron() {
    this.logger.debug('Running cron job to update all catalogs');
    try {
      await this.catalogService.updateAllDocuments();
      this.logger.debug('All catalogs updated successfully');
    } catch (error) {
      this.logger.error('Error updating catalogs in cron job', error);
    }
  }
}
