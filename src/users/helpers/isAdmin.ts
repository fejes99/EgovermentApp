import { type User } from 'wasp/entities';

export const isAdmin = (user: User | null | undefined) => user && user.isAdmin;
