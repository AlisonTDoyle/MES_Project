"use client";

import customers from './../data/mock_customers.json'
import products from './../data/mock_products.json'
import { useState } from "react";
import {Builder} from "xml2js";

export default function Home() {
  //#region code behind
  interface Customer { id: string, name: string }
  interface Product { id: string, name: string }
  interface OrderProduct { id: string, name: string, quantity: number }
  interface Order { id:number, customerId:string, customerName:string, products:OrderProduct[] }

  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [orderProducts, setOrderProducts] = useState<OrderProduct[] | null>(null);

  function UpdateSelectedCustomer(event: any): any {
    let id = event.target.value;
    let customer = customers.find(c => c.id === id) || null;
    setSelectedCustomer(customer);
  }

  function UpdateSelectedProduct(event: any): any {
    let id = event.target.value;
    let product = products.find(p => p.id === id) || null;
    setSelectedProduct(product);
  }

  function AddProductToOrder(event: any): any {
    let productSelect = document.getElementById("product-select") as HTMLSelectElement;
    let quantityInput = document.getElementById("product-quantity") as HTMLInputElement;

    let productId = productSelect.value;
    let productQuantity = quantityInput.value;

    let product:OrderProduct = {
      id: productId,
      name: products.find(p => p.id == productId)?.name || "",
      quantity: parseInt(productQuantity)
    }

    setOrderProducts(prev => prev ? [...prev, product] : [product]);

    console.log(orderProducts);
  }

  function CreateOrderFile():any {
    if (selectedCustomer != null && orderProducts != null) {
      // compile order variables into one object
      let order:Order = {
        id: Math.floor(Math.random()*100000000),
        customerId: selectedCustomer?.id,
        customerName: selectedCustomer?.name,
        products: orderProducts
      }

      // convert from json object to xml
      let builder = new Builder();
      let xml = builder.buildObject(order);
      console.log(xml)

      // publish xml file
      const blob = new Blob([xml], { type: 'application/xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'users.xml';
      a.click();
      URL.revokeObjectURL(url);
      }
      else {
        console.error("Check values. Either no customer selected or no products added.");
      }
  }
  //#endregion

  return (
    <main className='m-16 align-items'>
      <div className="grid grid-cols-2 sm:gap-4 gap-8 items-start">
        <div className="div">
          <h1 className="text-3xl font-bold">Mock Order Creator</h1>
          <p>Use this application to create an XML file that will represent an order such as the outputs that SAP would produce</p>
          <br />
          <h2 className="text-xl font-bold">Meta-level Details</h2>
          <form>
            <div className='my-2'>
              <label htmlFor="">Date</label><br />
              <input type="date" className="rounded border border-neutral-500 p-2 dark:bg-neutral-900 w-80" />
            </div>
            <div className='my-2'>
              <label htmlFor="">Customer ID</label><br />
              <input id="customer-id-input" type="text" className="rounded border border-neutral-700 p-2 dark:bg-neutral-900 w-80" disabled value={selectedCustomer != null ? selectedCustomer?.id : ""} />
            </div>
            <div className='my-2'>
              <label htmlFor="">Customer Name</label><br />
              <select className="rounded border border-neutral-500 p-2 dark:bg-neutral-900 w-80" onChange={(e) => UpdateSelectedCustomer(e)}>
                <option value="">Select a Customer</option>
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name}
                  </option>
                ))}
              </select>
            </div>
          </form>
          <hr className='my-4' />
          <h2 className="text-xl font-bold">Order Details</h2>
          <form action="">
            <div className='my-2'>
              <label htmlFor="">Item ID</label>
              <br />
              <input type="text" name="" id="product-id" className="rounded border border-neutral-700 p-2 dark:bg-neutral-900 w-80" value={selectedProduct != null ? selectedProduct?.id : ""} />
            </div>
            <div className='my-2'>
              <label htmlFor="">Item Name</label>
              <br />
              <select
                id="product-select"
                className="rounded border border-neutral-500 p-2 dark:bg-neutral-900 w-80" onChange={(e) => UpdateSelectedProduct(e)}>
                <option value="">Select a Product</option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </select>
            </div>
            <div className='my-2'>
              <label htmlFor="">Quantity</label>
              <br />
              <input type="text" name="" id="product-quantity" className="rounded border border-neutral-500 p-2 dark:bg-neutral-900 w-80" />
            </div>
          </form>
          <button onClick={(e) => AddProductToOrder(e)} className="my-4 p-2 rounded border border-slate-500 bg-slate-800 hover:border-sky-500 hover:bg-sky-800 hover:cursor-pointer">Add To Order</button>
        </div>
        <table className="border-collapse rounded border border-neutral-500 p-2 dark:bg-neutral-900 w-full">
          <thead>
            <tr>
              <th className="rounded border border-neutral-500 p-2">Item ID</th>
              <th className="rounded border border-neutral-500 p-2">Item Name</th>
              <th className="rounded border border-neutral-500 p-2">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {orderProducts?.map((p) => (
              <tr key={p.id}>
                <td className='align-top p-2'>{p.id}</td>
                <td className='align-top p-2'>{p.name}</td>
                <td className='align-top p-2'>{p.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={(e) => CreateOrderFile()} className="self-auto md:self-end my-4 p-2 rounded border border-slate-500 bg-slate-800 hover:border-sky-500 hover:bg-sky-800 hover:cursor-pointer">Submit Order</button>
    </main>
  );
}