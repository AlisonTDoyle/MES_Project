import { Customer } from "@/interfaces/customer";
import { Order } from "@/interfaces/order";
import { OrderItem } from "@/interfaces/order-item";
import fs from 'fs';
import mqtt from "mqtt";

let URL = "a3irqls3lqyqf6-ats.iot.eu-west-1.amazonaws.com"

export function CreateOrder(customer: Customer | null, orderItems: OrderItem[] | null): any {
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
        };

        console.log(order)

        SendOrderToServer(order);
    }
    else {
        console.error("Check values. Either no customer selected or no products added.");
    }
}

function SendOrderToServer(order: Order) {
    let client = mqtt.connect(URL, {
        // Certificates
        ca: fs.readFileSync('./../certificates/AmazonRootCA1.pem'),           // CA certificate
        cert: fs.readFileSync('./../certificates/cee09c23b78de3cf79a8dc08dba8182ba5e89205391358f86fb3228cb16f3a55-certificate.pem.crt'),     // Client certificate
        key: fs.readFileSync('./../certificates/cee09c23b78de3cf79a8dc08dba8182ba5e89205391358f86fb3228cb16f3a55-private.pem.key'),      // Client private key

        // Optional but recommended
        rejectUnauthorized: true,               // Enforce cert validation
        clientId: 'my-client-id',
    });

    client.on('connect', () => {
        console.log('Connected!');

        client.publish(
            'production-orders',                           // Topic
            JSON.stringify({ hello: 'world' }),   // Payload (string or Buffer)
            { qos: 1, retain: false },            // Options
            (err) => {
                if (err) console.error('Publish error:', err);
                else console.log('Message published!');
                client.end();
            }
        );
    });

    client.on('error', (err) => {
        console.error('Connection error:', err);
        client.end();
    });
}