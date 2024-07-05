import { User, UserRoles } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';

export class UserDTO {
  @Expose()
  firstName!: string;

  @Expose()
  lastName!: string;

  @Expose()
  email!: string;

  @Exclude()
  password!: string;

  @Expose()
  userName!: string;

  @Expose()
  userDetail!: User[];

  @Expose()
  createdAt!: Date;

  @Expose()
  updatedAt!: Date;

  @Expose()
  deletedAt!: Date | null;

  @Expose()
  role!: UserRoles;
}
