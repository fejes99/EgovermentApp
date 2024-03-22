import { type Service } from 'wasp/entities';
import { type Services } from 'wasp/server/crud';

export const getServices: Services.GetAllQuery<void, Service[]> = async (args, context) => {
  const { Service } = context.entities;

  return await Service.findMany({
    orderBy: {
      id: 'asc',
    },
  });
};
