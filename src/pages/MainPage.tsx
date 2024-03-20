import '../Main.css';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Card } from 'flowbite-react';
import { useAuth } from 'wasp/client/auth';
import { isRegistered } from '../users/helpers/isRegistred';

const Main: React.FC = () => {
  const { data: user } = useAuth();
  const history = useHistory();

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
          href='#'
          className='bg-white shadow-lg p-4 rounded-lg hover:shadow-xl transition duration-300 ease-in-out'
        >
          <h2 className='text-xl font-semibold mb-2'>Dodavanje Dokumenata</h2>
          <p className='text-gray-700'>Dodajte svoje lične dokumente.</p>
        </Card>
        <Card
          href='#'
          className='bg-white shadow-lg p-4 rounded-lg hover:shadow-xl transition duration-300 ease-in-out'
        >
          <h2 className='text-xl font-semibold mb-2'>Izdavanje Dokumenata</h2>
          <p className='text-gray-700'>Zahtev za izdavanje novog dokumenta po prvi put.</p>
        </Card>
        <Card
          href='#'
          className='bg-white shadow-lg p-4 rounded-lg hover:shadow-xl transition duration-300 ease-in-out'
        >
          <h2 className='text-xl font-semibold mb-2'>Zamena Dokumenata</h2>
          <p className='text-gray-700'>Zahtev za zamenu dokumenta nakon isteka roka važenja.</p>
        </Card>
        <Card
          href='#'
          className='bg-white shadow-lg p-4 rounded-lg hover:shadow-xl transition duration-300 ease-in-out'
        >
          <h2 className='text-xl font-semibold mb-2'>Ponovno Izdavanje Dokumenata</h2>
          <p className='text-gray-700'>
            Zahtev za izdavanje duplikata dokumenata zbog gubitka, krađe ili uništenja.
          </p>
        </Card>
      </div>
    </>
  );
};

export default Main;
