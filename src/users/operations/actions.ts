import { type RegisterUser } from 'wasp/server/operations';

type RegisterUserInput = {
  id: number;
  name: string;
  surname: string;
  email: string;
  gender: string;
  dateOfBirth: Date;
  address: string;
  cityId: number;
};

export const registerUser: RegisterUser<RegisterUserInput, void> = async (args, context) => {
  const { User } = context.entities;
  const { id, name, surname, email, gender, dateOfBirth, address, cityId } = args;

  await User.update({
    where: { id },
    data: {
      name,
      surname,
      email,
      gender,
      dateOfBirth,
      address,
      city: {
        connect: {
          id: cityId,
        },
      },
    },
  });
};
