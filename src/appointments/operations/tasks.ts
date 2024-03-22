import { type Appointment } from 'wasp/entities';
import { type Appointments } from 'wasp/server/crud';

export const getAppointments: Appointments.GetAllQuery<void, Appointment[]> = async (
  args,
  context
) => {
  const { Appointment } = context.entities;

  return await Appointment.findMany({});
};
