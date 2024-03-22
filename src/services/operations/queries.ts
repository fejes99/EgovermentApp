import { Service } from 'wasp/entities';
import {
  type GetAllCreationServices,
  type GetAllReplacementServices,
  type GetAllReissuanceServices,
} from 'wasp/server/operations';

export const getAllCreationServices: GetAllCreationServices<void, Service[]> = async (
  args,
  context
) => {
  const { Service } = context.entities;

  return Service.findMany({
    where: {
      name: {
        startsWith: 'Izdavanje',
      },
    },
  });
};

export const getAllReplacementServices: GetAllReplacementServices<void, Service[]> = async (
  args,
  context
) => {
  const { Service } = context.entities;

  return Service.findMany({
    where: {
      name: {
        startsWith: 'Obnavljanje',
      },
    },
  });
};

export const getAllReissuanceServices: GetAllReissuanceServices<void, Service[]> = async (
  args,
  context
) => {
  const { Service } = context.entities;

  return Service.findMany({
    where: {
      name: {
        startsWith: 'Ponovno izdavanje',
      },
    },
  });
};
