import { Injectable, NotFoundException } from '@nestjs/common';
import { Role } from './role.entity';
import { RoleRepository } from './role.repository';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RoleService {
  constructor(
    private readonly roleRepository: RoleRepository,
  ) {}

  async findAll(): Promise<Role[]> {
    return this.roleRepository.find();
  }

  async findOne(id: number): Promise<Role | null> {
    return this.roleRepository.findOne({ where: { id } });
  }

  async getById(id: number): Promise<Role> {
    const role = await this.findOne(id);
    if (!role) {
      throw new NotFoundException('Role not found');
    }
    return role;
  }

  async findByName(name: string): Promise<Role | null> {
    return this.roleRepository.findOne({ where: { name } });
  }

  async create(dto: CreateRoleDto): Promise<Role> {
    const role = this.roleRepository.create(dto);
    return this.roleRepository.save(role);
  }

  async remove(id: number): Promise<Role> {
    const role = await this.getById(id);
    return this.roleRepository.remove(role);
  }
}
