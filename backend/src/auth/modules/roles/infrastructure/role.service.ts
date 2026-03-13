import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';

import { InternalError, NotFoundError } from '@common/errors/service-errors';
import { Paginated } from '@common/pagination/Paginated';
import { Pagination } from '@common/pagination/pagination';
import {
  ROLE_REPOSITORY,
  RoleRepository,
} from '@db/repositories/role.repository';

import { CreateRoleDto } from '../dto/in/create-role.dto';
import { UpdateRoleDto } from '../dto/in/update-role.dto';
import { RoleResponse } from '../dto/out/role.response';
import { roleMapper } from '../mappers/role.mapper';
import { RoleGateway } from './role.gateway';

@Injectable()
export class RoleService implements RoleGateway {
  private readonly logger = new Logger(RoleService.name);

  constructor(
    @Inject(ROLE_REPOSITORY)
    private readonly roleRepository: RoleRepository,
  ) {}

  public async getById(roleId: string): Promise<RoleResponse> {
    try {
      const roleDto = await this.roleRepository.getRoleById(roleId);
      if (!roleDto) {
        this.logger.error(`Could not find role with ID "${roleId}"`);
        throw new NotFoundError(`role with ID "${roleId}"`);
      }
      const role = roleMapper.fromDto.toDomain(roleDto);
      return roleMapper.fromDomain.toResponse(role);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      this.logger.error(
        `Unexpected error while retrieving role with ID "${roleId}": ${error}`,
      );
      throw new InternalError('retrieving the role');
    }
  }

  public async getByName(roleName: string): Promise<RoleResponse> {
    try {
      const roleDto = await this.roleRepository.getRoleByName(roleName);
      if (!roleDto) {
        this.logger.error(`Could not find role with name "${roleName}"`);
        throw new NotFoundError(`role with name "${roleName}"`);
      }
      const role = roleMapper.fromDto.toDomain(roleDto);
      return roleMapper.fromDomain.toResponse(role);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      this.logger.error(
        `Unexpected error while retrieving role with name "${roleName}": ${error}`,
      );
      throw new InternalError('retrieving the role');
    }
  }

  public async getMany(
    pagination?: Pagination,
  ): Promise<Paginated<RoleResponse>> {
    try {
      const items = await this.roleRepository.getManyRoles(pagination);
      const roles = items.map(roleMapper.fromDto.toDomain);
      const total = await this.roleRepository.getAllRolesCount();
      return {
        page: roles.map(roleMapper.fromDomain.toResponse),
        total,
      };
    } catch (error) {
      this.logger.error(`Unexpected error while retrieving roles: ${error}`);
      throw new InternalError('retrieving roles');
    }
  }

  private ensureUniquePermissions(
    input: Partial<Pick<CreateRoleDto, 'permissions'>>,
  ): void {
    const { permissions } = input;
    if (!permissions) {
      return;
    }
    const duplicatePermissions = new Set();
    const permissionSet = new Set();
    permissions.forEach(({ permissionType }) => {
      if (permissionSet.has(permissionType)) {
        duplicatePermissions.add(permissionType);
      }
      permissionSet.add(permissionType);
    });
    if (!duplicatePermissions.size) {
      return;
    }
    throw new BadRequestException(
      `Duplicate permissions provided for the role: ${[...duplicatePermissions].map((permission) => `"${permission}"`).join(', ')}`,
    );
  }

  public async create(input: CreateRoleDto): Promise<RoleResponse> {
    this.ensureUniquePermissions(input);
    if ((await this.roleRepository.getRoleByName(input.name)) !== null) {
      throw new BadRequestException(
        `Role with name "${input.name}" already exists`,
      );
    }
    try {
      const roleDto = await this.roleRepository.createRole(input);
      const role = roleMapper.fromDto.toDomain(roleDto);
      return roleMapper.fromDomain.toResponse(role);
    } catch (error) {
      this.logger.error(`Unexpected error while creating role: ${error}`);
      throw new InternalError('creating the role');
    }
  }

  public async update(
    roleId: string,
    input: UpdateRoleDto,
  ): Promise<RoleResponse> {
    if (Object.keys(input).length === 0) {
      throw new BadRequestException(`Specify at least one field to update`);
    }
    this.ensureUniquePermissions(input);
    const existingRole = await this.roleRepository.getRoleById(roleId);
    if (existingRole === null) {
      throw new BadRequestException(`Role with ID "${roleId}" doesn\'t exist`);
    }
    if (existingRole.protectedRole) {
      throw new BadRequestException(
        `This role is protected and cannot be modified`,
      );
    }
    if (
      input.name &&
      (await this.roleRepository.getRoleByName(input.name)) !== null
    ) {
      throw new BadRequestException(
        `Role with name "${input.name}" already exists`,
      );
    }
    try {
      const roleDto = await this.roleRepository.updateRole(roleId, input);
      const role = roleMapper.fromDto.toDomain(roleDto);
      return roleMapper.fromDomain.toResponse(role);
    } catch (error) {
      this.logger.error(`Unexpected error while updating role: ${error}`);
      throw new InternalError('updating the role');
    }
  }

  public async delete(roleId: string): Promise<RoleResponse> {
    const existingRole = await this.roleRepository.getRoleById(roleId);
    if (existingRole === null) {
      throw new BadRequestException(`Role with ID "${roleId}" doesn\'t exist`);
    }
    if (existingRole.protectedRole) {
      throw new BadRequestException(
        `This role is protected and cannot be removed`,
      );
    }
    try {
      const roleDto = await this.roleRepository.deleteRole(roleId);
      const role = roleMapper.fromDto.toDomain(roleDto);
      return roleMapper.fromDomain.toResponse(role);
    } catch (error) {
      this.logger.error(`Unexpected error while deleting role: ${error}`);
      throw new InternalError('deleting the role');
    }
  }
}
