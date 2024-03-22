import React from 'react';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

interface SchedulerProps {
  appointments: any;
  formData: any;
  rooms: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  handleModalSubmit: () => void;
}

const Scheduler: React.FC<SchedulerProps> = ({
  appointments,
  formData,
  rooms,
  setFormData,
  handleModalSubmit,
}) => {
  const today = new Date();
  const eightAM = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 8);
  const fourPM = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 16);

  const events = appointments?.map((appointment: any) => {
    const room = rooms?.find((room: any) => room.id === appointment.roomId);
    const resourceId = room ? parseInt(room.id, 10) : null;

    return {
      id: appointment.id,

      start: new Date(appointment.appointmentStartDate),
      end: new Date(appointment.appointmentEndDate),
      resourceId: resourceId,
    };
  });
  console.log('🚀 ~ events ~ events:', events);

  const resources = rooms?.map((room: any) => ({
    id: room.id,
    name: 'Sala ' + room.name,
  }));

  const handleSlotSelect = (e: any) => {
    setFormData({
      ...formData,
      roomId: e.resourceId,
      appointmentStartDate: e.start,
      appointmentEndDate: e.end,
    });
    handleModalSubmit();
  };

  return (
    <div style={{ height: 500 }}>
      <Calendar
        dayLayoutAlgorithm={'no-overlap'}
        events={events}
        defaultDate={today}
        defaultView={Views.DAY}
        resources={resources}
        resourceIdAccessor='id'
        resourceTitleAccessor='name'
        localizer={localizer}
        onSelectSlot={handleSlotSelect}
        min={eightAM}
        max={fourPM}
        views={['day', 'work_week']}
        selectable
      />
    </div>
  );
};

export default Scheduler;
