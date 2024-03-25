import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Datepicker, Label, Select, TextInput } from 'flowbite-react';
import { City } from 'wasp/entities';
import { useAuth } from 'wasp/client/auth';
import { DocumentTypes } from 'wasp/client/crud';
import { createDocument } from 'wasp/client/operations';

const DocumentAddPage: React.FC = () => {
  const history = useHistory();

  const { data: user } = useAuth();
  const { data: documentTypes } = DocumentTypes.getAll.useQuery();

  const [formData, setFormData] = useState({
    documentTypeId: 0,
    number: 0,
    issueDate: new Date(),
    expiryDate: new Date(),
  });

  const [errors, setErrors] = useState({
    documentTypeId: '',
    number: '',
    issueDate: '',
    expiryDate: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: parseInt(value, 10),
    });
  };

  const handleIssueDateChange = (date: Date) => {
    setFormData({
      ...formData,
      issueDate: date,
    });
  };

  const handleExpiryDateChange = (date: Date) => {
    setFormData({
      ...formData,
      expiryDate: date,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let formIsValid = true;
    const newErrors = {
      documentTypeId: '',
      number: '',
      issueDate: '',
      expiryDate: '',
    };

    if (formData.number.toString().length !== 9) {
      newErrors.number = 'Broj dokumenta mora imati tačno 9 cifara.';
      formIsValid = false;
    }

    const maxIssueDate = new Date();
    if (formData.issueDate >= maxIssueDate) {
      newErrors.issueDate = 'Datum izdavanja mora biti u prošlosti.';
      formIsValid = false;
    }

    const minExpiryDate = new Date();
    const maxExpiryDate = new Date();
    maxExpiryDate.setFullYear(maxExpiryDate.getFullYear() + 10);
    if (formData.expiryDate <= minExpiryDate || formData.expiryDate > maxExpiryDate) {
      newErrors.expiryDate = 'Datum isteka mora biti u budućnosti i ne više od 10 godina.';
      formIsValid = false;
    }

    if (!formIsValid) {
      setErrors(newErrors);
      return;
    }

    await createDocument({
      userId: user!.id,
      typeId: formData.documentTypeId,
      number: formData.number,
      issueDate: formData.issueDate,
      expiryDate: formData.expiryDate,
    });
    history.push('/');
  };

  return (
    <div className='max-w-xl mx-auto p-6 bg-white rounded shadow-md space-y-6'>
      <h1 className='text-3xl font-bold text-center my-1'>Dodajte dokument</h1>
      <p className='text-sm text-gray-600 text-start mb-6'>Unesite podatke Vašeg dokumenta</p>
      <form onSubmit={handleSubmit}>
        <div className='mb-6'>
          <Label htmlFor='documentTypeId' value='Dokument' />
          <Select
            name='documentTypeId'
            value={formData.documentTypeId}
            onChange={handleChange}
            required
            className='input mt-1'
          >
            <option value={0} disabled hidden>
              Odaberite dokument
            </option>
            {documentTypes?.map((documentType: City) => (
              <option key={documentType.id} value={documentType.id}>
                {documentType.name}
              </option>
            ))}
          </Select>
          {errors.documentTypeId && <p className='text-red-500'>{errors.documentTypeId}</p>}
        </div>

        <div className='mb-6'>
          <Label htmlFor='number' value='Broj dokumenta' />
          <TextInput
            name='number'
            type='number'
            value={formData.number}
            onChange={handleChange}
            required
            className='input mt-1'
            helperText={<div>Broj dokumenta ima 9 cifara.</div>}
          />
          {errors.number && <p className='text-red-500'>{errors.number}</p>}
        </div>

        <div className='mb-6'>
          <Label htmlFor='issueDate' value='Datum izdavanja dokumenta' />
          <Datepicker
            name='issueDate'
            value={formData.issueDate.toLocaleDateString()}
            onSelectedDateChanged={handleIssueDateChange}
            maxDate={new Date()}
            required
            className='input mt-1'
          />
          {errors.issueDate && <p className='text-red-500'>{errors.issueDate}</p>}
        </div>

        <div className='mb-6'>
          <Label htmlFor='issueDate' value='Datum izdavanja dokumenta' />
          <Datepicker
            name='expiryDate'
            value={formData.expiryDate.toLocaleDateString()}
            onSelectedDateChanged={handleExpiryDateChange}
            minDate={new Date()}
            required
            className='input mt-1'
          />
          {errors.expiryDate && <p className='text-red-500'>{errors.expiryDate}</p>}
        </div>
        <div className='text-center'>
          <Button color='blue' type='submit' className='btn btn-primary'>
            Dodaj dokument
          </Button>
        </div>
      </form>
    </div>
  );
};

export default DocumentAddPage;
