interface User {
  id: string;
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
  isFeatured: boolean;
}

interface UserDetails {
  first_name: string;
  last_name: string;
  gender: 'male' | 'female';
  home_address: string;
}

export type { User, UserDetails };
