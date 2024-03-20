import { type CreateCity } from 'wasp/server/operations';

type CreateCityInput = {
  name: string;
};

export const createCity: CreateCity<CreateCityInput, void> = async (args, context) => {
  const { City } = context.entities;
  const { name } = args;

  await City.create({
    data: {
      name,
    },
  });
};
