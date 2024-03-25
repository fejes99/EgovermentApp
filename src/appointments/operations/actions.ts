import { emailSender } from 'wasp/server/email';
import { type CreateAppointment } from 'wasp/server/operations';
import { formatDate } from '../../common/helpers/formatDate';
import { formatTime } from '../../common/helpers/formatTime';

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
  const { Appointment, Service, Room, User } = context.entities;
  const { appointmentStartDate, appointmentEndDate, userId, serviceId, roomId } = args;

  // Fetch additional information
  const [service, room, user] = await Promise.all([
    Service.findFirstOrThrow({ where: { id: serviceId } }),
    Room.findFirstOrThrow({ where: { id: roomId } }),
    User.findFirstOrThrow({ where: { id: userId } }),
  ]);

  // Create appointment
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

  const emailSubject = 'Potvrda zakazivanja termina';
  const emailText =
    `Poštovani/a ${user.name},\n\n` +
    `Obaveštavamo Vas da je Vaš termin uspešno zakazan. Detalji:\n\n` +
    `- Datum i vreme početka: ${appointmentStartDate}\n` +
    `- Usluga: ${service.name}\n` +
    `- Sala: ${room.name}\n\n` +
    `Hvala Vam na poverenju.\n\nS poštovanjem,\nEuprava`;

  const info = await emailSender.send({
    to: user.email!,
    subject: emailSubject,
    text: emailText,
    html: `<p>Poštovani/a ${user.name} ${user.surname},</p>
           <p>Obaveštavamo Vas da je Vaš termin uspešno zakazan. Detalji:</p>
           <ul>
             <li><strong>Datum i vreme početka:</strong> ${formatTime(
               appointmentStartDate
             )} ${formatDate(appointmentStartDate)}</li>
             <li><strong>Usluga:</strong> ${service.name}</li>
             <li><strong>Sala:</strong> ${room.name} - ${user.cityName}</li>
           </ul>
           <p>Hvala Vam na poverenju.</p>
           <p><em>S poštovanjem,</em><br/>Euprava.</p>`,
  });
  console.log('🚀 ~ info:', info);
};
