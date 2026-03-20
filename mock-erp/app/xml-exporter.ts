import { Customer } from "@/interfaces/customer";
import { Order } from "@/interfaces/order";
import { OrderItem } from "@/interfaces/order-item";
import { Builder } from "xml2js";

export function CreateOrder(customer: Customer|null, orderItems: OrderItem[]|null): any {
    if (customer != null && orderItems != null) {
        // compile order variables into one object
        let order: Order = {
            orderHeader: {
                orderNumber: Math.floor(Math.random() * 100000000),
                // xml cant handle data as its an object to needs to be a string
                orderDate: new Date().toLocaleDateString(),
                customer: customer
            },
            orderItems: {
                item: orderItems
            }
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
        a.download = `order_${customer.id}_${order.orderHeader.orderNumber}_${order.orderHeader.orderDate}.xml`;
        a.click();
        URL.revokeObjectURL(url);
    }
    else {
        console.error("Check values. Either no customer selected or no products added.");
    }
}