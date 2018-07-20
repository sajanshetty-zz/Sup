import { Component, OnInit } from '@angular/core';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

import { AppService } from '../../_services/app.service';

// Include Models
import { Product } from '../../_models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {

	private _products: Product[] = [];

	constructor(private _appService: AppService,
				private _toastr: ToastrService,) { }

	ngOnInit() {
		this.getProducts();
	}

	private getProducts(){
		this._appService.getProducts()
			.subscribe(
				products => {
					this._products = products;
				},
				error => {}
			)
	}

	private deleteProduct(productId){
		this._appService.deleteProduct(productId)
			.subscribe(
				product => {
					this._toastr.success(product.name + " has been deleted successfully", "Success");
					this.getProducts();
				},
				error => {
					this._toastr.error("Product not deleted", "Error");
				}
			)
	}

}
