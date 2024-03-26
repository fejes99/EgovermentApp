import { Card } from 'flowbite-react';

const ServicesPage: React.FC = () => {
  return (
    <>
      <h1 className='text-5xl font-bold text-center my-12'>Usluge</h1>
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6'>
        <Card imgSrc='/issue-documents.jpg'>
          <h2 className='text-xl font-semibold mb-2'>Izdavanje dokumenata</h2>
          <p className='font-normal text-gray-700 dark:text-gray-400'>
            Usluga izdavanja dokumenata omogućava građanima sticanje novih identifikacionih
            dokumenata, kao što su lična karta, pasoš ili vozačka dozvola, po prvi put. Izdavanje
            dokumenata prvi put je neophodno za sticanje osnovnih identifikacionih dokumenata ili za
            dobijanje novih nakon isteka važenja postojećih.
          </p>
        </Card>
        <Card imgSrc='/replace-documents.jpg'>
          <h2 className='text-xl font-semibold mb-2'>Zamena dokumenata</h2>
          <p className='font-normal text-gray-700 dark:text-gray-400'>
            Usluga zamene dokumenata omogućava građanima dobijanje novih identifikacionih dokumenata
            nakon isteka važenja dokumenata. Zamena dokumenata je neophodna kako bi građani
            održavali važeće identifikacione dokaze.
          </p>
        </Card>
        <Card imgSrc='/reissue-documents.jpg'>
          <h2 className='text-xl font-semibold mb-2'>Ponovno izdavanje dokumenata</h2>
          <p className='font-normal text-gray-700 dark:text-gray-400'>
            Usluga ponovnog izdavanja dokumenata omogućava građanima dobijanje novih
            identifikacionih dokumenata nakon gubitka, krađe ili oštećenja postojećih dokumenata.
            Ponovno izdavanje dokumenata je važno kako bi građani mogli da obnove svoje
            identifikacione dokaze u slučaju neželjenih događaja.
          </p>
        </Card>
      </div>
    </>
  );
};

export default ServicesPage;
