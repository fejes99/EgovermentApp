import { type Room } from 'wasp/entities';
import { type Rooms } from 'wasp/server/crud';

export const getRooms: Rooms.GetAllQuery<void, Room[]> = async (args, context) => {
  const { Room } = context.entities;

  return await Room.findMany({
    orderBy: {
      cityName: 'asc',
    },
  });
};
