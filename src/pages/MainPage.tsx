import '../Main.css';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Card } from 'flowbite-react';
import { useAuth } from 'wasp/client/auth';
import { isRegistered } from '../users/helpers/isRegistred';

const Main: React.FC = () => {
  const history = useHistory();
  const { data: user } = useAuth();

  useEffect(() => {
    if (!isRegistered(user)) {
      history.push('/registration');
    }
  }, [user, history]);

  return (
    <>
      <h1 className='text-5xl font-bold text-center my-16'>Dobro došli</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 mt-6'>
        <Card
          href='/documents/add'
          className='bg-blue-900 text-white shadow-lg p-4 rounded-lg hover:bg-blue-500 hover:shadow-xl transition duration-300 ease-in-out'
        >
          <h2 className='text-xl font-semibold mb-2'>Dodavanje Dokumenata</h2>
          <p className='text-gray-300'>Dodajte svoje lične dokumente.</p>
        </Card>
        <Card
          href='/appointment/new'
          className='bg-blue-900 text-white shadow-lg p-4 rounded-lg hover:bg-blue-500 hover:shadow-xl transition duration-300 ease-in-out'
        >
          <h2 className='text-xl font-semibold mb-2'>Izdavanje Dokumenata</h2>
          <p className='text-gray-300'>Zahtev za izdavanje novog dokumenta po prvi put.</p>
        </Card>
        <Card
          href='/appointment/replacement'
          className='bg-blue-900 text-white shadow-lg p-4 rounded-lg hover:bg-blue-500 hover:shadow-xl transition duration-300 ease-in-out'
        >
          <h2 className='text-xl font-semibold mb-2'>Zamena Dokumenata</h2>
          <p className='text-gray-300'>Zahtev za zamenu dokumenta nakon isteka roka važenja.</p>
        </Card>
        <Card
          href='/appointment/reissuance'
          className='bg-blue-900 text-white shadow-lg p-4 rounded-lg hover:bg-blue-500 hover:shadow-xl transition duration-300 ease-in-out'
        >
          <h2 className='text-xl font-semibold mb-2'>Ponovno Izdavanje Dokumenata</h2>
          <p className='text-gray-300'>
            Zahtev za izdavanje duplikata dokumenata zbog gubitka, krađe ili uništenja.
          </p>
        </Card>
      </div>
    </>
  );
};

export default Main;
