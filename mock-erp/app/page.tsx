import { Customer } from '@/interfaces/customer';
import Form from './form';

export default async function Home() {
  let customers:Customer[] = [];

  let response = await fetch('http://localhost:3001/api/customer/');
  let parsedResponse = await response.json();
  customers = parsedResponse.data;

  return (
    <Form Customers={customers}></Form>
  );
}