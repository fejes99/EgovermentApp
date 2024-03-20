import { PrismaClient } from '@prisma/client';
import { createCity } from './cities/operations/actions';
import { createDocumentType } from './documentTypes/operations/actions';
import { cities } from './cities/seedData';
import { documentTypes } from './documentTypes/seedData';

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
