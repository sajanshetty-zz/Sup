import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AppService } from '../../_services/app.service';

@Component({
	selector: 'app-add-product',
	templateUrl: './add-product.component.html'
})
export class AddProductComponent implements OnInit {

	private _submitted: boolean = false;
	private _productForm: FormGroup;
	private _editFlag: boolean = false;
	private _editId: number = 0;

	constructor(private _appService: AppService,
		private _toastr: ToastrService,
		private _router: Router,
		public _route: ActivatedRoute,
		private _fb: FormBuilder) { }

	ngOnInit() {
		this.createForm();
		this._route.params.subscribe(params => {
			if (params.productId && params.productId != 0) {
				this._editFlag = true;
				this._editId = params.productId;
				this.getProduct(params.productId);
			}
		});
	}

	private createForm() {
		this._productForm = this._fb.group({
			name: ['', Validators.required],
			price: ['', Validators.required],
			size: ['M', Validators.required],
			color: ['', Validators.required],
		});
	}

	get productForm() { return this._productForm.controls; }

	private onSubmit() {
		this._submitted = true;

		if (this._productForm.invalid) {
			return;
		}

		if (this._editFlag) { // Update product
			this._appService.updateProduct(this._productForm.value, this._editId)
				.subscribe(
					product => {
						this._toastr.success(product.name + ' has been updated successfully!', 'Success');
						this._router.navigate(['/dashboard/products']);
					},
					error => {
						this._toastr.error('Product not added', 'Error');
					}
				);
		} else { // Add new product
			this._appService.addProduct(this._productForm.value)
				.subscribe(
					product => {
						this._toastr.success(product.name + ' has been added successfully!', 'Success');
						this._router.navigate(['/dashboard/products']);
					},
					error => {
						this._toastr.error('Product not added', 'Error');
					}
				);
		}
	}

	private getProduct(productId: number) {
		this._appService.getProduct(productId)
			.subscribe(
				user => {
					this._productForm.patchValue({
						name: user.name,
						price: user.price,
						size: user.size,
						color: user.color,
					})
				},
				error => {
					this._toastr.error('Product not found', 'Error');
				}
			);
	}

}
