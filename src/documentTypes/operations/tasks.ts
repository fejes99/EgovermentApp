import { type DocumentType } from 'wasp/entities';
import { type DocumentTypes } from 'wasp/server/crud';

export const getDocumentTypes: DocumentTypes.GetAllQuery<void, DocumentType[]> = async (
  args,
  context
) => {
  const { DocumentType } = context.entities;

  return await DocumentType.findMany({});
};
