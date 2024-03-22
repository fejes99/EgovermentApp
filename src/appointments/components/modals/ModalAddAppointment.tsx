import { Modal, Card, Button, Label, TextInput } from 'flowbite-react';
import { formatDate } from '../../../common/helpers/formatDate';
import { formatTime } from '../../../common/helpers/formatTime';

interface Props {
  isOpen: boolean;
  data: any;
  onClose: () => void;
  onModalSubmit: () => void;
}

const ModalAddAppointment: React.FC<Props> = ({ isOpen, data, onClose, onModalSubmit }) => {
  const handleModalSubmit = () => {
    onModalSubmit();
  };

  return (
    <Modal show={isOpen} onClose={onClose} popup>
      <Modal.Header>Rezervišite termin</Modal.Header>
      <Modal.Body>
        <div className='space-y-6'>
          <div>
            <div className='mb-2 block'>
              <Label htmlFor='serviceName' value='Naziv usluge' />
            </div>
            <TextInput id='serviceName' value={data.serviceName} disabled required />
          </div>

          <div>
            <div className='mb-2 block'>
              <Label htmlFor='userName' value='Podnosilac zahteva' />
            </div>
            <TextInput id='userName' value={data.userName} disabled required />
          </div>

          <div>
            <div className='mb-2 block'>
              <Label htmlFor='roomId' value='Broj sobe' />
            </div>
            <TextInput id='roomId' value={data.roomId} disabled required />
          </div>

          <Card className='p-4 border border-gray-200 rounded-md shadow-md'>
            <div className='flex flex-col'>
              <div className='mb-4'>
                <Label
                  htmlFor='selectedDate'
                  value='Izabrani termin'
                  className='text-sm font-medium text-gray-600'
                />
                <div className='mt-1 text-lg font-semibold'>{formatDate(data.startDate)}</div>
              </div>
              <div className='flex justify-between items-center'>
                <div className='mr-4'>
                  <div className='mb-1'>
                    <Label
                      htmlFor='startDate'
                      value='Od'
                      className='text-sm font-medium text-gray-600'
                    />
                  </div>
                  <div className='text-base'>{formatTime(data.startDate)}</div>
                </div>
                <div>
                  <div className='mb-1'>
                    <Label
                      htmlFor='endDate'
                      value='Do'
                      className='text-sm font-medium text-gray-600'
                    />
                  </div>
                  <div className='text-base'>{formatTime(data.endDate)}</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className='w-full'>
          <Button onClick={handleModalSubmit}>Rezerviši</Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAddAppointment;
