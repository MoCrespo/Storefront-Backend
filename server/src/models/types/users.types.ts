export type User = {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  password: string;
  created_on: Date;
};

export type CreateUserDTO = {
  username: string;
  first_name: string;
  last_name: string;
  password: string;
};

export type UpdateUserDTO = {
  first_name: string;
  last_name: string;
};
