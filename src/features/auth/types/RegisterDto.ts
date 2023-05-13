export default interface RegisterDto {
  first_name: string;
  last_name: string;
  gender: 'male' | 'female';
  role: 'host' | 'guest';
  home_address: string;
  email: string;
  password: string;
}
