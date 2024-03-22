import { type CreateAppointment } from 'wasp/server/operations';

type CreateAppointmentInput = {
  appointmentStartDate: Date;
  appointmentEndDate: Date;
  userId: number;
  serviceId: number;
  roomId: number;
};

export const createAppointment: CreateAppointment<CreateAppointmentInput, void> = async (
  args,
  context
) => {
  const { Appointment } = context.entities;
  const { appointmentStartDate, appointmentEndDate, userId, serviceId, roomId } = args;

  await Appointment.create({
    data: {
      appointmentStartDate,
      appointmentEndDate,
      citizen: {
        connect: {
          id: userId,
        },
      },
      service: {
        connect: {
          id: serviceId,
        },
      },
      room: {
        connect: {
          id: roomId,
        },
      },
    },
  });
};
