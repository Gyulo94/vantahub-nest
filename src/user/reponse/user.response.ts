import { Image, Provider, Role, User } from '@prisma/client';

export class UserResponse {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  role: Role;
  provider: Provider;
  createdAt: Date;

  static fromModel(entity: User & { image?: Image | null }): UserResponse {
    const { id, name, email, image, provider, role, createdAt } = entity;
    return {
      id,
      name,
      email,
      image: image ? image.url : null,
      provider,
      role,
      createdAt,
    } as UserResponse;
  }
}
