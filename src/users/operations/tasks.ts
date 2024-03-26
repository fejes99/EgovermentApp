import { Appointment, Document, Room, Service, type User } from 'wasp/entities';
import { type Users } from 'wasp/server/crud';

export const getUsers: Users.GetAllQuery<void, User[]> = async (args, context) => {
  const { User } = context.entities;

  return await User.findMany({});
};

type GetUserInput = {
  id: number;
};

export const getUser: Users.GetQuery<
  GetUserInput,
  | (User & {
      documents: Document[];
      createdAppointments:
        | (Appointment & { room: Room | null; service: Service; processedBy: User | null })[]
        | null;
    })
  | null
> = async (args, context) => {
  const { User } = context.entities;
  const { id } = args;

  return await User.findUnique({
    where: {
      id: id,
    },
    include: {
      documents: true,
      createdAppointments: {
        include: {
          room: true,
          service: true,
          processedBy: true,
        },
        orderBy: {
          appointmentStartDate: 'desc',
        },
      },
    },
  });
};
