import { useAuth } from 'wasp/client/auth';
import { Users } from 'wasp/client/crud';
import { Card } from 'flowbite-react';
import { FaIdCard, FaPassport, FaCar } from 'react-icons/fa';
import { formatDate } from '../../common/helpers/formatDate';

const UserDocumentsPage: React.FC = () => {
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
    <div className='mx-auto px-4  max-w-screen-lg'>
      <h1 className='text-5xl font-bold text-center my-12'>Usluge</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 justify-center'>
        {userData?.documents.map((document) => (
          <Card key={document.id} className='bg-white shadow-lg rounded-lg p-4 w-sm'>
            <div className='flex justify-center mb-4'>{getIcon(document.typeName)}</div>
            <h2 className='text-xl font-semibold text-center mb-2'>{document.typeName}</h2>
            <div className='grid grid-cols-2 gap-2'>
              <div className='text-gray-500'>Broj:</div>
              <div>{document.number}</div>
              <div className='text-gray-500'>Izdato dana:</div>
              <div>{formatDate(document.issueDate)}</div>
              <div className='text-gray-500'>Ističe dana:</div>
              <div>{formatDate(document.expiryDate)}</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UserDocumentsPage;
