import { type CreateRoom } from 'wasp/server/operations';

type CreateRoomInput = {
  name: string;
  cityId: number;
};

export const createRoom: CreateRoom<CreateRoomInput, void> = async (args, context) => {
  const { Room } = context.entities;
  const { name, cityId } = args;

  await Room.create({
    data: {
      name,
      city: {
        connect: {
          id: cityId,
        },
      },
    },
  });
};
