export interface Message {
  id?: string;
  title?: string;
  type?: 'Error' | 'Success';
  message?: string;
}
