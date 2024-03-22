import { PrismaClient } from '@prisma/client';
import { documentTypes } from './documentTypes/seedData';
import { createDocumentType } from './documentTypes/operations/actions';
import { cities } from './cities/seedData';
import { createCity } from './cities/operations/actions';
import { rooms } from './rooms/seedData';
import { createRoom } from './rooms/operations/actions';
import { createService } from './services/operations/actions';
import { services } from './services/seedData';

export const documentTypesSeed = async (prismaClient: PrismaClient) => {
  for (const { name } of documentTypes) {
    await createDocumentType(
      {
        name,
      },
      { entities: { DocumentType: prismaClient.documentType } }
    );
  }
};

export const citiesSeed = async (prismaClient: PrismaClient) => {
  for (const { name } of cities) {
    await createCity(
      {
        name,
      },
      { entities: { City: prismaClient.city } }
    );
  }
};

export const roomsSeed = async (prismaClient: PrismaClient) => {
  for (const { name, cityId } of rooms) {
    await createRoom(
      {
        name,
        cityId,
      },
      { entities: { Room: prismaClient.room } }
    );
  }
};

export const servicesSeed = async (prismaClient: PrismaClient) => {
  for (const { name, price } of services) {
    await createService(
      {
        name,
        price,
      },
      { entities: { Service: prismaClient.service } }
    );
  }
};
