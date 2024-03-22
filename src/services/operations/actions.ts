import { type CreateService } from 'wasp/server/operations';

type CreateServiceInput = {
  name: string;
  price: number;
};

export const createService: CreateService<CreateServiceInput, void> = async (args, context) => {
  const { Service } = context.entities;
  const { name, price } = args;

  await Service.create({
    data: {
      name,
      price,
    },
  });
};
