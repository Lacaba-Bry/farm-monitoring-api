import { Injectable } from '@nestjs/common';
import { CreateCropDto } from './dto/create-crop.dto.js';
import { UpdateCropDto } from './dto/update-crop.dto.js';

@Injectable()
export class CropsService {
  create(createCropDto: CreateCropDto) {
    return 'This action adds a new crop';
  }

  findAll() {
    return `This action returns all crops`;
  }

  findOne(id: number) {
    return `This action returns a #${id} crop`;
  }

  update(id: number, updateCropDto: UpdateCropDto) {
    return `This action updates a #${id} crop`;
  }

  remove(id: number) {
    return `This action removes a #${id} crop`;
  }
}
