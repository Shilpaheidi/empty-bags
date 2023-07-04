import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { DateTimeService } from 'src/common/services/date-time/date-time.service';
import { EmptyBagStoreDataController } from './controllers/empty-bag-store-data/empty-bag-store-data.controller';
import { QueryProceduresModule } from './query-procedures/query-procedures.module';
import { EmptyBagStoreDataService } from './services/empty-bag-store-data/empty-bag-store-data.service';

@Module({
  imports: [QueryProceduresModule, AuthModule],
  controllers: [EmptyBagStoreDataController],
  providers: [EmptyBagStoreDataService,DateTimeService],
})
export class EmptyBagAppModule {}
