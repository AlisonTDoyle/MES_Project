"use client";

import customers from '@/data/mock_customers.json'
import products from '@/data/mock_products.json'
import { useState } from "react";
import { Builder } from "xml2js";
import { Customer } from '@/interfaces/customer'
import { Item } from '@/interfaces/item'
import { OrderItem } from '@/interfaces/order-item';
import { Order } from '@/interfaces/order';
import * as fs from 'fs';

export default function Home() {
  //#region code behind
  // properties
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [orderItems, setOrderItems] = useState<OrderItem[] | null>(null);

  // methods
  function UpdateSelectedCustomer(event: any): any {
    let id = event.target.value;
    let customer = customers.find(c => c.id === id) || null;
    setSelectedCustomer(customer);
  }

  function UpdateselectedItem(event: any): any {
    let id = event.target.value;
    let product = products.find(p => p.id === id) || null;
    setSelectedItem(product);
  }

  function AddProductToOrder(event: any): any {
    let productSelect = document.getElementById("product-select") as HTMLSelectElement;
    let quantityInput = document.getElementById("product-quantity") as HTMLInputElement;

    let productId = productSelect.value;
    let productQuantity = quantityInput.value;

    let product: OrderItem = {
      id: productId,
      description: products.find(p => p.id == productId)?.description || "",
      quantity: parseInt(productQuantity),
      unit: products.find(p => p.id == productId)?.unit || ""
    }

    // updating order items. to add new product need to re-add older ones and current
    setOrderItems(prev => prev ? [...prev, product] : [product]);

    console.log(orderItems);
  }

  function CreateOrderFile(): any {
    if (selectedCustomer != null && orderItems != null) {
      // compile order variables into one object
      let order: Order = {
        orderHeader: {
          orderNumber: Math.floor(Math.random() * 100000000),
          orderDate: new Date(),
          customer: selectedCustomer
        },
        orderItems: orderItems
      }

      // convert from json object to xml
      let builder = new Builder();
      let xml = builder.buildObject(order);
      console.log(xml);

      // publish xml file
      const blob = new Blob([xml], { type: 'application/xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'order.xml';
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
              <label htmlFor="">Customer ID</label><br />
              <input id="customer-id-input" type="text" className="rounded border border-neutral-700 p-2 dark:bg-neutral-900 w-80 text-white/50" disabled value={selectedCustomer != null ? selectedCustomer?.id : ""} />
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
              <input type="text" name="" id="product-id" className="rounded border border-neutral-700 p-2 dark:bg-neutral-900 w-80 text-white/50" value={selectedItem != null ? selectedItem?.id : ""} />
            </div>
            <div className='my-2'>
              <label htmlFor="">Item Name</label>
              <br />
              <select
                id="product-select"
                className="rounded border border-neutral-500 p-2 dark:bg-neutral-900 w-80" onChange={(e) => UpdateselectedItem(e)}>
                <option value="">Select a Product</option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.description}
                  </option>
                ))}
              </select>
            </div>
            <div className='my-2'>
              <label htmlFor="">Quantity</label>
              <br />
              <div className='w-80 grid grid-cols-[70%_30%]'>
                <input type="text" name="" id="product-quantity" className="rounded-l border border-neutral-500 p-2 dark:bg-neutral-900" />
                <span id="product-quantity" className="rounded-r border border-neutral-500 p-2 dark:bg-neutral-900 text-white/50" >{selectedItem?.unit}</span>
              </div>
            </div>
          </form>
          <button onClick={(e) => AddProductToOrder(e)} className="my-4 p-2 rounded border border-slate-500 bg-slate-800 hover:border-sky-500 hover:bg-sky-800 hover:cursor-pointer">Add To Order</button>
        </div>
        <div className="dark:bg-neutral-900 h-full">
          <table className="border-collapse rounded border border-neutral-500 p-2 dark:bg-neutral-900 w-full">
            <thead>
              <tr>
                <th className="border border-neutral-500 bg-neutral-800 p-2">Item ID</th>
                <th className="border border-neutral-500 bg-neutral-800 p-2">Item Name</th>
                <th className="border border-neutral-500 bg-neutral-800 p-2">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {orderItems?.map((p) => (
                <tr key={p.id}>
                  <td className='align-top rounded border border-neutral-500 p-2'>{p.id}</td>
                  <td className='align-top rounded border border-neutral-500 p-2'>{p.description}</td>
                  <td className='align-top rounded border border-neutral-500 p-2'>{p.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <button onClick={(e) => CreateOrderFile()} className="self-auto md:self-end my-4 p-2 rounded border border-slate-500 bg-slate-800 hover:border-sky-500 hover:bg-sky-800 hover:cursor-pointer">Submit Order</button>
    </main>
  );
}