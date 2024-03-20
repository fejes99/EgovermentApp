import { type CreateDocumentType } from 'wasp/server/operations';

type createDocumentTypeInput = {
  name: string;
};

export const createDocumentType: CreateDocumentType<createDocumentTypeInput, void> = async (
  args,
  context
) => {
  const { name } = args;
  const { DocumentType } = context.entities;

  await DocumentType.create({
    data: {
      name,
    },
  });
};
