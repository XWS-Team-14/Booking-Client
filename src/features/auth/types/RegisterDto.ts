export default interface RegisterDto {
  first_name: string;
  last_name: string;
  address: string;
  gender: 'male' | 'female';
  email: string;
  password1: string;
  password2: string;
}
