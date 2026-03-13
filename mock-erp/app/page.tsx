import { Customer } from '@/interfaces/customer';
import Form from './form';
import { Product } from '@/interfaces/product';

export default async function Home() {
  let customers:Customer[] = [];
  let products:Product[] = [];

  let response = await fetch('http://localhost:3001/api/customer/');
  let parsedResponse = await response.json();
  customers = parsedResponse.data;

  response = await fetch('http://localhost:3001/api/product/')
  parsedResponse = await response.json();
  products = parsedResponse.data;

  return (
    <Form Customers={customers}></Form>
  );
}