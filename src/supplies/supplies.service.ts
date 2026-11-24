import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Supply } from './entities/supply.entity';
import { Notification } from '../notifications/entities/notification.entity';
import { CreateSupplyDto } from './dto/create-supply.dto';
import { UpdateSupplyDto } from './dto/update-supply.dto';

@Injectable()
export class SuppliesService {
  constructor(
    @InjectRepository(Supply)
    private readonly suppliesRepo: Repository<Supply>,
    @InjectRepository(Notification)
    private readonly notificationsRepo: Repository<Notification>,
  ) {}

  create(dto: CreateSupplyDto) {
    const supply = this.suppliesRepo.create(dto);
    return this.suppliesRepo.save(supply);
  }

  findAll() {
    return this.suppliesRepo.find();
  }

  async findOne(id: number) {
    const supply = await this.suppliesRepo.findOne({ where: { supplyId: id } });
    if (!supply) throw new NotFoundException(`Supply #${id} not found`);
    return supply;
  }

  async update(id: number, dto: UpdateSupplyDto, userId: number) {
    const supply = await this.findOne(id);
    Object.assign(supply, dto);
    const updated = await this.suppliesRepo.save(supply);

    // Automated Low-Stock Alert (Lab 3 System Integration Feature)
    if (Number(updated.quantity) <= Number(updated.minimumStock)) {
      const alert = this.notificationsRepo.create({
        userId,
        supplyId: updated.supplyId,
        message: `Low Stock Alert: ${updated.supplyName} is down to ${updated.quantity} ${updated.unit} (Minimum: ${updated.minimumStock} ${updated.unit}).`,
      });
      await this.notificationsRepo.save(alert);
    }

    return updated;
  }

  async remove(id: number) {
    const supply = await this.findOne(id);
    await this.suppliesRepo.remove(supply);
    return { message: 'Supply deleted successfully' };
  }
}
