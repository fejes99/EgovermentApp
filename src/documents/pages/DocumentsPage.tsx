import { Card } from 'flowbite-react';

const DocumentsPage: React.FC = () => {
  return (
    <>
      <h1 className='text-5xl font-bold text-center my-12'>Dokumenta</h1>
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6'>
        <Card imgSrc='/id-card.jpg'>
          <h2 className='text-xl font-semibold mb-2'>Lična karta</h2>
          <p className='font-normal text-gray-700 dark:text-gray-400'>
            Lična karta je zvanični identifikacioni dokument koji izdaje država. Sadrži osnovne
            lične podatke građana. Osim što služi kao dokaz identiteta, lična karta može biti
            potrebna prilikom obavljanja različitih administrativnih procedura.
          </p>
        </Card>
        <Card imgSrc='/passport.jpg'>
          <h2 className='text-xl font-semibold mb-2'>Putna isprava (pasoš)</h2>
          <p className='font-normal text-gray-700 dark:text-gray-400'>
            Putna isprava ili pasoš je međunarodno priznati dokument koji omogućava nosiocu prelazak
            granica i ulazak u strane zemlje Pasoš je neophodan prilikom međunarodnih putovanja i
            služi kao dokaz identiteta u inostranstvu.
          </p>
        </Card>
        <Card imgSrc='/driver-licence.jpg'>
          <h2 className='text-xl font-semibold mb-2'>Vozačka dozvola</h2>
          <p className='font-normal text-gray-700 dark:text-gray-400'>
            Vozačka dozvola je zvanični dokument koji izdaju nadležne institucije, a koji omogućava
            nosiocu legalno upravljanje motornim vozilom. Vozačka dozvola je obavezna prilikom
            vožnje motornih vozila i može biti potrebna kao identifikacija prilikom saobraćajnih
            kontrola.
          </p>
        </Card>
      </div>
    </>
  );
};

export default DocumentsPage;
