import { SetMetadata } from '@nestjs/common';
import { PERMISSION } from '@/common/enums';

export const PERMISSIONS_KEY = 'permissions';

export const Permissions = (...permissions: PERMISSION[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);
