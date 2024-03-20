import { User } from 'wasp/entities';

export const isRegistered = (user: User | null | undefined) => {
  return (
    user &&
    user.name &&
    user.surname &&
    user.email &&
    user.gender &&
    user.dateOfBirth &&
    user.address &&
    user.cityName
  );
};
