import { ReflectMetadata } from '@nestjs/common';
import { Role } from '../../user/interfaces';

export const Roles = (...roles: Role[]) => ReflectMetadata('roles', roles);
