import { Role } from '@prisma/client';

export type Payload = {
  id: string;
  role: Role;
  iat?: number;
  exp?: number;
};
