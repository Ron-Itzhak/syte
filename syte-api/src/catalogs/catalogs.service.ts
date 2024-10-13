import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  Collection,
  ObjectId,
  InsertOneResult,
  WithId,
  DeleteResult,
} from 'mongodb';
import { Catalog } from './interfaces/catalog.interface';
import { CreateCatalogDto, UpdateCatalogDto } from './dto/catalog.dto';
@Injectable()
export class CatalogsService {
  constructor(
    @Inject('DATABASE_CONNECTION') private collection: Collection<Catalog>,
  ) {}

  async create(
    createCatalogDto: CreateCatalogDto,
  ): Promise<InsertOneResult<Catalog>> {
    if (createCatalogDto.isPrimary) {
      console.log(createCatalogDto.isPrimary);

      await this.collection.updateMany(
        { vertical: createCatalogDto.vertical, isPrimary: true },
        { $set: { isPrimary: false } },
      );
    }

    const catalog: Catalog = {
      ...createCatalogDto,
      indexedAt: null,
    };
    return await this.collection.insertOne(catalog);
  }

  async findAll(): Promise<WithId<Catalog>[]> {
    return this.collection.find().toArray();
  }

  async findOne(id: ObjectId): Promise<Catalog> {
    const catalog = await this.collection.findOne({ _id: id });
    if (!catalog) throw new NotFoundException('Catalog not found');
    return catalog;
  }

  async update(updateCatalogDto: UpdateCatalogDto): Promise<UpdateCatalogDto> {
    const catalog = await this.findOne(new ObjectId(updateCatalogDto._id));
    console.log(catalog);

    if (updateCatalogDto.isPrimary) {
      await this.collection.updateMany(
        { vertical: catalog.vertical, isPrimary: true },
        { $set: { isPrimary: false } },
      );
    }
    const timestamp = new Date().toString();
    const { _id, ...updateData } = updateCatalogDto;
    console.log(updateCatalogDto);

    const updated = {
      _id,
      ...updateData,
      indexedAt: timestamp,
    };

    await this.collection.updateOne(
      { _id: new ObjectId(updateCatalogDto._id) },
      { $set: { ...updateData, indexedAt: timestamp } },
    );
    return updated;
  }

  async updateAllDocuments() {
    await this.collection.updateMany(
      {},
      { $set: { indexedAt: new Date().toDateString() } },
    );
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.collection.deleteOne({ _id: new ObjectId(id) });
  }

  async bulkDelete(ids: string[]): Promise<DeleteResult> {
    const objectIds = ids.map((id) => new ObjectId(id));
    return this.collection.deleteMany({ _id: { $in: objectIds } });
  }
}
