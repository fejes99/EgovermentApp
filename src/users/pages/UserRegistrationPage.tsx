import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Label, TextInput, Select, Radio, Button, Datepicker } from 'flowbite-react';
import { type City } from 'wasp/entities';
import { Cities } from 'wasp/client/crud';
import { useAuth } from 'wasp/client/auth';
import { registerUser } from 'wasp/client/operations';
import { isRegistered } from '../helpers/isRegistred';

const UserRegistrationPage: React.FC = () => {
  const history = useHistory();
  const { data: user } = useAuth();
  const { data: cities } = Cities.getAll.useQuery();

  useEffect(() => {
    if (isRegistered(user)) {
      history.push('/');
    }
  }, [user, history]);

  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    gender: '',
    dateOfBirth: new Date(),
    address: '',
    cityId: 0,
  });

  const [errors, setErrors] = useState({
    name: '',
    surname: '',
    gender: '',
    dateOfBirth: '',
    address: '',
    cityId: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (date: Date) => {
    setFormData({
      ...formData,
      dateOfBirth: date,
    });
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: parseInt(value, 10),
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let formIsValid = true;
    const newErrors = {
      name: '',
      surname: '',
      gender: '',
      dateOfBirth: '',
      address: '',
      cityId: '',
    };

    if (!formData.name.trim()) {
      newErrors.name = 'Ime je obavezno polje';
      formIsValid = false;
    }

    if (!formData.surname.trim()) {
      newErrors.surname = 'Prezime je obavezno polje';
      formIsValid = false;
    }

    if (!formData.gender) {
      newErrors.gender = 'Izaberite pol';
      formIsValid = false;
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Datum rođenja je obavezno polje';
      formIsValid = false;
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Adresa je obavezno polje';
      formIsValid = false;
    }

    if (!formData.cityId) {
      newErrors.cityId = 'Izaberite grad';
      formIsValid = false;
    }

    if (!formIsValid) {
      setErrors(newErrors);
      return;
    }

    await registerUser({
      id: user!.id,
      name: formData.name,
      surname: formData.surname,
      email: user!.auth!.identities[0].providerUserId,
      gender: formData.gender,
      dateOfBirth: formData.dateOfBirth,
      address: formData.address,
      cityId: formData.cityId,
    });
  };

  return (
    <div className='max-w-lg mx-auto p-6 bg-white rounded shadow-md space-y-6'>
      <h1 className='text-3xl font-bold text-center my-1'>Registrujte nalog</h1>
      <p className='text-sm text-gray-600 text-start mb-6'>
        Da bi nastavili da koristite portal neophodno je da završite proces registracije
      </p>
      <form onSubmit={handleSubmit}>
        <div className='mb-6'>
          <Label htmlFor='name' value='Ime' />
          <TextInput
            name='name'
            type='text'
            value={formData.name}
            onChange={handleChange}
            required
            className='input mt-1'
          />
          {errors.name && <p className='text-red-500'>{errors.name}</p>}
        </div>
        <div className='mb-6'>
          <Label htmlFor='surname' value='Prezime' />
          <TextInput
            name='surname'
            type='text'
            value={formData.surname}
            onChange={handleChange}
            required
            className='input mt-1'
          />
          {errors.surname && <p className='text-red-500'>{errors.surname}</p>}
        </div>
        <div className='mb-6 flex justify-between items-center'>
          <Label value='Pol' className='mr-4' />
          <div className='flex items-center space-x-4'>
            <Radio
              name='gender'
              value='male'
              checked={formData.gender === 'male'}
              onChange={handleChange}
              required
              className='radio'
            />
            <Label htmlFor='male'>Muški</Label>
            <Radio
              name='gender'
              value='female'
              checked={formData.gender === 'female'}
              onChange={handleChange}
              required
              className='radio'
            />
            <Label htmlFor='female'>Ženski</Label>
          </div>
          {errors.gender && <p className='text-red-500'>{errors.gender}</p>}
        </div>
        <div className='mb-6'>
          <Label htmlFor='dateOfBirth' value='Datum rođenja' />
          <Datepicker
            name='dateOfBirth'
            value={formData.dateOfBirth.toLocaleDateString()}
            onSelectedDateChanged={handleDateChange}
            required
            className='input mt-1'
          />
          {errors.dateOfBirth && <p className='text-red-500'>{errors.dateOfBirth}</p>}
        </div>
        <div className='mb-6'>
          <Label htmlFor='cityId' value='Prebivalište' />
          <Select
            name='cityId'
            value={formData.cityId}
            onChange={handleCityChange}
            required
            className='input mt-1'
          >
            <option value={0} disabled hidden>
              Odaberite mesto
            </option>
            {cities?.map((city: City) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </Select>
          {errors.cityId && <p className='text-red-500'>{errors.cityId}</p>}
        </div>
        <div className='mb-6'>
          <Label htmlFor='address' value='Adresa' />
          <TextInput
            name='address'
            type='text'
            value={formData.address}
            onChange={handleChange}
            required
            className='input mt-1'
          />
          {errors.address && <p className='text-red-500'>{errors.address}</p>}
        </div>
        <div className='text-center'>
          <Button type='submit' className='btn btn-primary'>
            Registruj se
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UserRegistrationPage;
