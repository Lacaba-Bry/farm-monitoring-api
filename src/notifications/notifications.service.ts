import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationsRepo: Repository<Notification>,
  ) {}

  create(dto: CreateNotificationDto) {
    const notification = this.notificationsRepo.create(dto);
    return this.notificationsRepo.save(notification);
  }

  findAll() {
    return this.notificationsRepo.find({
      relations: { user: true, supply: true },
      order: { notificationDate: 'DESC' },
    });
  }

  async findOne(id: number) {
    const notification = await this.notificationsRepo.findOne({
      where: { notificationId: id },
      relations: { user: true, supply: true },
    });
    if (!notification) throw new NotFoundException(`Notification #${id} not found`);
    return notification;
  }

  async update(id: number, dto: UpdateNotificationDto) {
    const notification = await this.findOne(id);
    Object.assign(notification, dto);
    return this.notificationsRepo.save(notification);
  }

  async remove(id: number) {
    const notification = await this.findOne(id);
    await this.notificationsRepo.remove(notification);
    return { message: 'Notification deleted successfully' };
  }
}
