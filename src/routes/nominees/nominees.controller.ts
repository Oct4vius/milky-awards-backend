import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { NomineesService } from './nominees.service';
import { CreateNomineeDto } from './dto/create-nominee.dto';
import { UpdateNomineeDto } from './dto/update-nominee.dto';
import { AssignToCategoryDto } from './dto/assign-to-category.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('nominees')
export class NomineesController {
  constructor(private readonly nomineesService: NomineesService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/nominees',
        filename: (_req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const originalName = file.originalname.replace(/\s+/g, '_');
          cb(null, uniqueSuffix + '-' + originalName);
        },
      }),
      fileFilter(_req, file, callback) {
        const allowedMimes = [
          'image/jpeg',
          'image/png',
          'image/gif',
          'video/mp4',
        ];
        if (!allowedMimes.includes(file.mimetype)) {
          return callback(
            new Error('Only image and mp4 files are allowed!'),
            false,
          );
        }
        callback(null, true);
      },
      limits: { fileSize: 5 * 1024 * 1024 },
    }),
  )
  create(@Body() createNomineeDto: CreateNomineeDto, @UploadedFile() file: Express.Multer.File) {
    return this.nomineesService.create(createNomineeDto, file);
  }

  @Post('assign-to-category')
  assignToCategory(@Body() assignToCategoryDto: AssignToCategoryDto) {
    return this.nomineesService.assignToCategory(assignToCategoryDto);
  }

  @Get()
  findAll() {
    return this.nomineesService.findAll();
  }

  @Get(':uuid')
  findOne(@Param('uuid') uuid: string) {
    return this.nomineesService.findOne(uuid);
  }

  @Patch(':uuid')
  update(
    @Param('uuid') uuid: string,
    @Body() updateNomineeDto: UpdateNomineeDto,
  ) {
    return this.nomineesService.update(uuid, updateNomineeDto);
  }

  @Delete(':uuid')
  remove(@Param('uuid') uuid: string) {
    return this.nomineesService.remove(uuid);
  }
}
