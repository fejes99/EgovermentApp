import { type CreateDocument } from 'wasp/server/operations';
import { addYears } from 'date-fns';

type CreateDocumentInput = {
  userId: number;
  typeId: number;
  number?: number;
  issueDate?: Date;
  expiryDate?: Date;
};

export const createDocument: CreateDocument<CreateDocumentInput, void> = async (args, context) => {
  const { number, issueDate, expiryDate, userId, typeId } = args;
  const { Document } = context.entities;

  const generateRandomNumber = (): number => {
    return Math.floor(Math.random() * 900000000) + 100000000;
  };

  if (number && issueDate && expiryDate) {
    await Document.create({
      data: {
        number,
        issueDate,
        expiryDate,
        user: {
          connect: {
            id: userId,
          },
        },
        type: {
          connect: {
            id: typeId,
          },
        },
      },
    });
  } else {
    const now = new Date().toLocaleString();

    await Document.create({
      data: {
        number: generateRandomNumber(),
        issueDate: now,
        expiryDate: addYears(now, 10).toLocaleString(),
        user: {
          connect: {
            id: userId,
          },
        },
        type: {
          connect: {
            id: typeId,
          },
        },
      },
    });
  }
};
