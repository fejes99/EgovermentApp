import { useAuth } from 'wasp/client/auth';
import { Users } from 'wasp/client/crud';
import { Table } from 'flowbite-react';
import { FaIdCard, FaPassport, FaCar } from 'react-icons/fa';
import { formatDate } from '../../common/helpers/formatDate';
import { formatTime } from '../../common/helpers/formatTime';

const UserAppointmentsPage: React.FC = () => {
  const { data: user } = useAuth();
  const { data: userData, isLoading, error } = Users.get.useQuery({ id: user!.id });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  const getIcon = (documentType: string) => {
    switch (documentType) {
      case 'Lična karta':
        return <FaIdCard size={40} />;
      case 'Putna isprava (pasoš)':
        return <FaPassport size={40} />;
      case 'Vozačka dozvola':
        return <FaCar size={40} />;
      default:
        return null;
    }
  };

  return (
    <div className='mx-auto px-4 max-w-screen-lg overflow-x-auto'>
      <h1 className='text-5xl font-bold text-center my-12'>Zakazivanja</h1>
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Termin</Table.HeadCell>
          <Table.HeadCell>Usluga</Table.HeadCell>
          <Table.HeadCell>Prostorija</Table.HeadCell>
          <Table.HeadCell>Obradio</Table.HeadCell>
        </Table.Head>
        <Table.Body className='divide-y'>
          {userData?.createdAppointments &&
            userData.createdAppointments.map((appointment: any) => (
              <Table.Row key={appointment.id}>
                <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                  {formatTime(appointment.appointmentStartDate)}{' '}
                  {formatDate(appointment.appointmentStartDate)}
                </Table.Cell>

                <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                  {appointment.service.name}
                </Table.Cell>

                <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                  {appointment.room.name}
                </Table.Cell>

                <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                  {appointment.processedBy
                    ? `${appointment.processedBy.name} ${appointment.processedBy.surname}`
                    : '-'}
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default UserAppointmentsPage;
