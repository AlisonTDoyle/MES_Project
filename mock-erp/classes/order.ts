interface Order {
    orderHeader: {
        orderNumber:number,
        orderDate:Date,
        customer:Customer,
    },
    orderItems: OrderItem[]
}