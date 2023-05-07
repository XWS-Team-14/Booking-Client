interface User {
  firstName: string;
  lastName: string;
  gender: 'female' | 'male';
  role: 'guest' | 'host' | 'admin';
  email: string;
  isAdmin: boolean;
  address: string;
  date_joined: Date;
  last_login: Date;
  is_active: boolean;
}

export type { User };
