import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiHandlerService } from './services/api-handler-service/api-handler-service.service';
import { JsonExporterService } from './services/json-exporter-service/json-exporter-service.service';
import { Customer } from './interfaces/customer';
import { Product } from './interfaces/product';
import { CommonModule } from '@angular/common';
import { OrderItem } from './interfaces/order-item';


@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'mock-erp';

  constructor(private apiHandlerService: ApiHandlerService, private jsonExporterService: JsonExporterService) { }

  public Customers: Customer[] = []
  public Products: Product[] = []
  public OrderItems: OrderItem[] = []
  public SelectedCustomer: Customer | null = null
  public SelectedProduct: Product | null = null

  ngOnInit() {
    this.apiHandlerService.FetchCustomers().subscribe(customers => {
      this.Customers = customers;
    });

    this.apiHandlerService.FetchProducts().subscribe(products => {
      this.Products = products;
    });
  }

  public UpdateSelectedCustomer(event: any): any {
    let id = event.target.value;
    let customer = this.Customers.find(customer => customer.id == id) || null;
    this.SelectedCustomer = customer;
  }

  public UpdateSelectedItem(event: any): any {
    let id = event.target.value;
    let product = this.Products.find(p => p.id == id) || null;
    this.SelectedProduct = product;
  }

  public AddProductToOrder(): any {
    let productSelect = document.getElementById("product-select") as HTMLSelectElement;
    let quantityInput = document.getElementById("product-quantity") as HTMLInputElement;

    let productId = productSelect.value;
    let productQuantity = quantityInput.value;

    let product: OrderItem = {
      id: productId,
      description: this.Products.find(p => (p.id).toString() == productId)?.description || "",
      quantity: parseInt(productQuantity),
      unit: this.Products.find(p => (p.id).toString() == productId)?.unit || ""
    }

    // updating order items. to add new product need to re-add older ones and current
    this.OrderItems.push(product);

    console.log(this.OrderItems);
  }

  public CreateOrder() {
    this.jsonExporterService.CreateOrder(this.SelectedCustomer, this.OrderItems)
  }
}