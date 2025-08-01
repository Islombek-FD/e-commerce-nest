import { PERMISSION } from '@/common/enums';

export class JwtPayload {
  sub: number;
  username: string;
  role: string;
  permissions: PERMISSION[];
}
