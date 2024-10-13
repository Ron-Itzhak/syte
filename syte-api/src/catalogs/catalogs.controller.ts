// import {
//   Body,
//   Controller,
//   Delete,
//   Get,
//   Param,
//   Post,
//   Put,
//   Query,
// } from '@nestjs/common';
// import { CatalogsService } from './catalogs.service';
// import { CreateCatalogDto, UpdateCatalogDto } from './dto/catalog.dto';
// import { BulkDeleteDto } from './dto/bulkDelete.dto';

// @Controller('catalogs')
// export class CatalogsController {
//   constructor(private readonly catalogsService: CatalogsService) {}

//   @Post()
//   async create(@Body() createCatalogDto: CreateCatalogDto) {
//     return this.catalogsService.create(createCatalogDto);
//   }

//   @Get()
//   async findAll() {
//     return this.catalogsService.findAll();
//   }

//   @Put()
//   async update(@Body() updateCatalogDto: UpdateCatalogDto) {
//     return this.catalogsService.update(updateCatalogDto);
//   }

//   @Delete('/delete/:id')
//   async delete(@Param('id') id: string) {
//     return this.catalogsService.delete(id);
//   }

//   @Delete('bulkDelete')
//   async bulkDelete(@Query() query: BulkDeleteDto) {
//     const { ids } = query;
//     return this.catalogsService.bulkDelete(ids);
//   }
// }
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { CatalogsService } from './catalogs.service';
import { CreateCatalogDto, UpdateCatalogDto } from './dto/catalog.dto';
import { BulkDeleteDto } from './dto/bulkDelete.dto';

@Controller('catalogs')
export class CatalogsController {
  constructor(private readonly catalogsService: CatalogsService) {}

  @Post()
  async create(
    @Body() createCatalogDto: CreateCatalogDto,
    @Res() res: Response,
  ) {
    try {
      const result = await this.catalogsService.create(createCatalogDto);
      return res.status(HttpStatus.CREATED).json({
        message: 'Catalog created successfully',
        data: result,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error creating catalog',
        error: error.message,
      });
    }
  }

  @Get()
  async findAll(@Res() res: Response) {
    try {
      const result = await this.catalogsService.findAll();
      return res.status(HttpStatus.OK).json({
        message: 'Catalogs retrieved successfully',
        data: result,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error retrieving catalogs',
        error: error.message,
      });
    }
  }

  @Put()
  async update(
    @Body() updateCatalogDto: UpdateCatalogDto,
    @Res() res: Response,
  ) {
    try {
      const result = await this.catalogsService.update(updateCatalogDto);
      return res.status(HttpStatus.OK).json({
        message: 'Catalog updated successfully',
        data: result,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error updating catalog',
        error: error.message,
      });
    }
  }

  @Delete('/delete/:id')
  async delete(@Param('id') id: string, @Res() res: Response) {
    try {
      const result = await this.catalogsService.delete(id);
      return res.status(HttpStatus.OK).json({
        message: 'Catalog deleted successfully',
        data: result,
      });
    } catch (error) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: 'Error deleting catalog',
        error: error.message,
      });
    }
  }

  @Delete('bulkDelete')
  async bulkDelete(@Query() query: BulkDeleteDto, @Res() res: Response) {
    const { ids } = query;
    try {
      const result = await this.catalogsService.bulkDelete(ids);
      if (result.deletedCount > 1)
        return res.status(HttpStatus.OK).json({
          message: 'Catalogs deleted successfully',
          data: result,
        });
      else {
        return res.status(HttpStatus.OK).json({
          message: 'no catalogs were deleted',
          data: result,
        });
      }
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error bulk deleting catalogs',
        error: error.message,
      });
    }
  }
}
