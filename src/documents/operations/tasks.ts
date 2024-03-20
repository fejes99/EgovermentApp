import { type Document } from 'wasp/entities';
import { type Documents } from 'wasp/server/crud';

export const getDocuments: Documents.GetAllQuery<void, Document[]> = async (args, context) => {
  const { Document } = context.entities;

  return await Document.findMany({});
};
