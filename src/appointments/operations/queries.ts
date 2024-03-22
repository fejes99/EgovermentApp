import { Appointment } from 'wasp/entities';
import { GetCityAppointments } from 'wasp/server/operations';

type GetCityAppointmentsInput = {
  cityName: string;
};

export const getCityAppointments: GetCityAppointments<
  GetCityAppointmentsInput,
  Appointment[]
> = async (args, context) => {
  const { Appointment } = context.entities;
  const { cityName } = args;

  return await Appointment.findMany({
    where: {
      room: {
        cityName,
      },
    },
  });
};
