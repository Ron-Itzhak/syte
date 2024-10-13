import { Module } from '@nestjs/common';
import { Collection, Db, MongoClient } from 'mongodb';
import { Catalog } from 'src/catalogs/interfaces/catalog.interface';

@Module({
  providers: [
    {
      provide: 'DATABASE_CONNECTION',
      useFactory: async (): Promise<Collection<Catalog>> => {
        try {
          const client = await MongoClient.connect(process.env.MONGO_URI, {});
          const db: Db = client.db('syte');
          return db.collection('catalogs');
        } catch (e) {
          throw new Error('authentication failed on the mongo');
        }
      },
    },
  ],
  exports: ['DATABASE_CONNECTION'],
})
export class MongoModule {}
