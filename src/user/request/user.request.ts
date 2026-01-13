import { Prisma, Provider } from '@prisma/client';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UserRequest {
  @IsString()
  @IsOptional()
  id: string;

  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsString()
  @IsOptional()
  provider: Provider;

  @IsString()
  @IsOptional()
  token?: string;

  @IsString()
  @IsOptional()
  password: string;

  public toModel(
    id: string,
    hashedPassword?: string,
    imageId?: string,
  ): Prisma.UserCreateInput {
    return {
      id,
      email: this.email,
      name: this.name,
      provider: this.provider,
      image: imageId ? { connect: { id: imageId } } : undefined,
      password: hashedPassword ?? null,
    };
  }
}
