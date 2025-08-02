import { Injectable, NotFoundException } from '@nestjs/common';
import { RoleService } from '@/modules/roles/role.service';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly roleService: RoleService
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find({ relations: ['role'] });
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { username },
      relations: ['role'],
    });
  }

  async getByUsername(username: string): Promise<User> {
    const user = await this.findByUsername(username);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findById(id: number): Promise<User | null> {
    return this.userRepository.findOne({
      where: { id },
      relations: ['role'],
    });
  }

  async getById(id: number): Promise<User> {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async create(dto: CreateUserDto): Promise<User> {
    const role = await this.roleService.getById(dto.roleId);
    const user = this.userRepository.create({
      firstName: dto.firstName,
      lastName: dto.lastName,
      middleName: dto.middleName,
      username: dto.username,
      password: dto.password,
      status: dto.status,
      role
    });
    return this.userRepository.save(user);
  }

  async update(id: number, dto: UpdateUserDto): Promise<User> {
    await this.getById(id);
    await this.userRepository.update(id, dto);
    return this.getById(id);
  }

  async remove(id: number): Promise<User> {
    const user = await this.getById(id);
    return this.userRepository.remove(user);
  }
}
