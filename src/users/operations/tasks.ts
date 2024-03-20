import { type User } from 'wasp/entities';
import { type Users } from 'wasp/server/crud';

export const getUsers: Users.GetAllQuery<void, User[]> = async (args, context) => {
  const { User } = context.entities;

  return await User.findMany({});
};
