import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Label, Select } from 'flowbite-react';
import { Service } from 'wasp/entities';
import { useAuth } from 'wasp/client/auth';
import {
  useQuery,
  getCityRooms,
  getCityAppointments,
  getAllReplacementServices,
  createAppointment,
} from 'wasp/client/operations';
import Scheduler from '../components/Scheduler/Scheduler';
import ModalAddAppointment from '../components/modals/ModalAddAppointment';

const AppointmentReplacementPage: React.FC = () => {
  const history = useHistory();

  const { data: user } = useAuth();
  const { data: services } = useQuery(getAllReplacementServices);
  const { data: rooms } = useQuery(getCityRooms, { cityName: user?.cityName || '' });
  const { data: appointments } = useQuery(getCityAppointments, { cityName: user?.cityName || '' });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    serviceId: 0,
    appointmentStartDate: new Date(),
    appointmentEndDate: new Date(),
    roomId: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: parseInt(value, 10),
    });
  };

  const handleOpenModal = () => {
    formData.serviceId !== 0 && setIsModalOpen(true);
  };

  const handleSubmit = async () => {
    try {
      await createAppointment({
        appointmentStartDate: formData.appointmentStartDate,
        appointmentEndDate: formData.appointmentEndDate,
        userId: user!.id || 0,
        serviceId: formData.serviceId,
        roomId: formData.roomId,
      });
      history.push('/appointments/me');
    } catch (e: any) {
      console.log(e.message);
    }
  };

  const modalData = {
    serviceName: services?.find((service) => service.id === formData.serviceId)?.name,
    startDate: formData.appointmentStartDate,
    endDate: formData.appointmentEndDate,
    userName: `${user?.name} ${user?.surname}`,
    roomId: rooms?.find((room) => room.id === formData.roomId)?.name,
  };

  return (
    <div className='max-w-5xl mx-auto p-6 bg-white rounded shadow-md space-y-6'>
      <h1 className='text-3xl font-bold text-center my-1'>Izvadite dokument</h1>
      <p className='text-sm text-gray-600 text-start mb-6'>
        Unesite podatke za zahtev vađenja dokumenta prvi put
      </p>
      <div>
        <div className='mb-12'>
          <Label htmlFor='serviceId' value='Dokument' />
          <Select
            name='serviceId'
            value={formData.serviceId}
            onChange={handleChange}
            required
            className='input mt-1'
          >
            <option value={0} disabled hidden>
              Odaberite uslugu
            </option>
            {services &&
              services.map((service: Service) => (
                <option key={service.id} value={service.id}>
                  {service.name}
                </option>
              ))}
          </Select>
        </div>

        {appointments && rooms && (
          <div className='my-6 h-fit'>
            <Scheduler
              appointments={appointments}
              formData={formData}
              rooms={rooms}
              setFormData={setFormData}
              handleModalSubmit={handleOpenModal}
            />
          </div>
        )}
      </div>

      <ModalAddAppointment
        isOpen={isModalOpen}
        data={modalData}
        onClose={() => setIsModalOpen(false)}
        onModalSubmit={handleSubmit}
      />
    </div>
  );
};

export default AppointmentReplacementPage;
