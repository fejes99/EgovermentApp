import { type City } from 'wasp/entities';
import { type Cities } from 'wasp/server/crud';

export const getCities: Cities.GetAllQuery<void, City[]> = async (args, context) => {
  const { City } = context.entities;

  return await City.findMany({
    orderBy: {
      name: 'asc',
    },
  });
};
