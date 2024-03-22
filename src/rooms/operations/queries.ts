import { Room } from 'wasp/entities';
import { GetCityRooms } from 'wasp/server/operations';

type GetCityRoomsInput = {
  cityName: string;
};

export const getCityRooms: GetCityRooms<GetCityRoomsInput, Room[]> = async (args, context) => {
  const { Room } = context.entities;
  const { cityName } = args;

  return Room.findMany({
    where: { cityName },
  });
};
