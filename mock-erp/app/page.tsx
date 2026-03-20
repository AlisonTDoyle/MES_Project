import { Customer } from '@/interfaces/customer';
import Form from './form';
import { Product } from '@/interfaces/product';

export default async function Home() {
  let customers:Customer[] = [];
  let products:Product[] = [];

  let response:any;
  let parsedResponse:any;
  try {
    response = await fetch('http://localhost:3001/api/customer/');
    parsedResponse = await response.json();
    customers = parsedResponse.data;
  } catch (error) {
    console.log(error)
  }

  try {
    response = await fetch('http://localhost:3001/api/product/')
    parsedResponse = await response.json();
    products = parsedResponse.data;
  } catch (error) {
    console.log(error)
  }

  return (
    <Form Customers={customers} Products={products}></Form>
  );
}