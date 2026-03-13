import { Injectable, Logger } from '@nestjs/common';

import { Permission } from '@auth/modules/permissions/domain/Permission';
import { PermissionType } from '@auth/modules/permissions/enums/permission-type.enum';
import { permissionMapper } from '@auth/modules/permissions/mappers/permission.mapper';
import { Pagination } from '@common/pagination';
import { DbSearchDto } from '@db/dto/search.dto';

import { PermissionRepository } from '../../repositories/permission.repository';
import { PostgresConnector } from './connector';

@Injectable()
export class PostgresPermissionRepository implements PermissionRepository {
  private readonly logger = new Logger(PostgresPermissionRepository.name);

  private SELECT_PERMISSIONS_SQL = (args?: DbSearchDto): string => `
   SELECT
      id,
      description,
      permission_type
   FROM permissions
   ${this.connector.searchSQL(args)};
  `;

  private SELECT_PERMISSIONS_COUNT_SQL = (): string =>
    `SELECT COUNT(*) AS total FROM permissions;`;

  constructor(private readonly connector: PostgresConnector) {}

  public async getPermissionByType(
    permissionType: PermissionType,
  ): Promise<Permission | null> {
    const connection = this.connector.getConnection();
    const resultRaw = await connection.query(
      this.SELECT_PERMISSIONS_SQL({
        where: `permission_type = '${permissionType}'`,
      }),
    );
    if (!resultRaw?.rows?.[0]) {
      return null;
    }
    const result = permissionMapper.fromDto.toDomain(resultRaw?.rows?.[0]);
    this.logger.debug(`Fetched ${result}`);
    return result;
  }

  public async getManyPermissions(
    pagination?: Pagination,
  ): Promise<Permission[]> {
    const connection = this.connector.getConnection();
    const resultRaw = await connection.query(
      this.SELECT_PERMISSIONS_SQL({
        pagination,
      }),
    );
    if (!resultRaw?.rows) {
      return [];
    }
    const result = resultRaw.rows.map(permissionMapper.fromDto.toDomain);
    this.logger.debug(`Fetched ${result.length} results`);
    return result;
  }

  public async getAllPermissionsCount(): Promise<number> {
    const connection = this.connector.getConnection();
    const resultRaw = await connection.query(this.SELECT_PERMISSIONS_COUNT_SQL);
    if (!resultRaw?.rows?.[0]) {
      return 0;
    }
    return resultRaw.rows[0].total;
  }
}
