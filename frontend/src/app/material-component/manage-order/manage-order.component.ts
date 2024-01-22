import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BillService } from 'src/app/servies/bill.service';
import { CategoryService } from 'src/app/servies/category.service';
import { ProductService } from 'src/app/servies/product.service';
import { SnackbarService } from 'src/app/servies/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constent';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html',
  styleUrls: ['./manage-order.component.scss'],
})
export class ManageOrderComponent implements OnInit {
[x: string]: any;
  displayedColumns = ['name', 'category', 'price', 'quantity', 'total', 'edit'];
  dataSource: any = [];
  manageOrderForm: any = FormGroup;
  categorys: any = [];
  products: any = [];
  price: any;
  total: number = 0;
  responseMessage: any;
  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private productService: ProductService,
    private snakbarService: SnackbarService,
    private billService: BillService
  ) {}
  ngOnInit(): void {
    this.getCategorys();
    this.manageOrderForm = this.formBuilder.group({
      name: [
        null,
        [Validators.required, Validators.pattern(GlobalConstants.nameRegex)],
      ],
      email: [
        null,
        [Validators.required, Validators.pattern(GlobalConstants.emailRegex)],
      ],
      contactNumber: [
        null,
        [
          Validators.required,
          Validators.pattern(GlobalConstants.contactNumberRegex),
        ],
      ],
      paymentMethod: [null, [Validators.required]],
      product: [null, [Validators.required]],
      category: [null, [Validators.required]],
      quantity: [null, [Validators.required]],
      price: [null, Validators.required],
      total: [0, [Validators.required]],
    });
  }
  getCategorys() {
    this.categoryService.getCategorys().subscribe(
      (response: any) => {
        this.categorys = response;
      },
      (error: any) => {
        console.log(error);
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalConstants.genericError;
        }
        this.snakbarService.openSnackbar(
          this.responseMessage,
          GlobalConstants.error
        );
      }
    );
  }
  getProductByCateGory(value: any) {
    this.productService.getProductsByCategory(value.id).subscribe(
      (response: any) => {
        this.products = response;
        this.manageOrderForm.controls['price'].setValue('');
        this.manageOrderForm.controls['quantity'].setValue('');
        this.manageOrderForm.controls['total'].setValue(0);
      },
      (error: any) => {
        
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          
          this.responseMessage = GlobalConstants.genericError;
        }
        this.snakbarService.openSnackbar(
          this.responseMessage,
          GlobalConstants.error
        );
      }
    );
  }
  getProdcutDetails(value: any) {
    this.productService.getById(value.id).subscribe(
      (response: any) => {
        this.manageOrderForm.controls['price'].setValue(response.price);
        this.manageOrderForm.controls['quantity'].setValue('1');
        this.manageOrderForm.controls['total'].setValue(response.price * 1);

      },
      (error: any) => {
        if (error.error?.message) {
          this.responseMessage = error.error?.meassge;
        } else {
          this.responseMessage = GlobalConstants.genericError;
        }
        this.snakbarService.openSnackbar(
          this.responseMessage,
          GlobalConstants.error
        );
      }
    );
  }
  setQuantity(value: any) {
    var temp = this.manageOrderForm.controls['quantity'].value;
    if (temp > 0) {
      this.manageOrderForm.controls['total'].setValue(
        this.manageOrderForm.controls['quantity'].value *
          this.manageOrderForm.controls['price'].value
      );
    } else if (temp != '') {
      this.manageOrderForm.controls['quantity'].setValue('1');
      this.manageOrderForm.controls['total'].setValue(
        this.manageOrderForm.controls['quantity'].value *
          this.manageOrderForm.controls['price'].value
      );
    }
  }
  validateSubmit() {
    if(
      this.manageOrderForm.controls['name'].value === null ||
      this.manageOrderForm.controls['email'].value === null ||
      this.manageOrderForm.controls['contactNumber'].value === null ||
      this.manageOrderForm.controls['paymentMethod'].value === null ||
      !this.manageOrderForm.controls['contactNumber'].valid ||
      !this.manageOrderForm.controls['email'].valid
    ) 
    {
      
      return true;
    } else {
     
      return false;
    }
  }
  add() {
    var formdata = this.manageOrderForm.value;
    var productName = this.dataSource.find(
      (e: { id: number }) => e.id == formdata.product.id
    );
    if (productName === undefined) {
      this.total = this.total + formdata.total;
      this.dataSource.push({
        id: formdata.product.id,
        name: formdata.product.name,
        category: formdata.category.name,
        quantity: formdata.quantity,
        price: formdata.price,
        total: formdata.total,
      });
      this.dataSource = [...this.dataSource];
      this.snakbarService.openSnackbar(GlobalConstants.productAdded, 'success');
    } else {
      this.snakbarService.openSnackbar(
        GlobalConstants.productExistError,
        GlobalConstants.error
      );
    }
  }
  handleDeleteAction(value: any, element: any) {
    this.total = this.total - element.total;
    this.dataSource.splice(value, 1);
    this.dataSource = [...this.dataSource];
  }
  submitAction() {
    var formdata = this.manageOrderForm.value;
    var data = {
      name: formdata.name,
      email: formdata.email,
      contactNumber: formdata.contactNumber,
      paymentMethod: formdata.paymentMethod,
      total: this.total,
      productDetail: JSON.stringify(this.dataSource),
    };
    this.billService.generateReport(data).subscribe(
      (response: any) => {
        this.downloadFile(response?.uuid);
        this.manageOrderForm.reset();
        this.dataSource = [];
        this.total = 0;
      },
      (error) => {
        if (error.error?.message) {
          this.responseMessage = error.error?.meassge;
        } else {
          this.responseMessage = GlobalConstants.genericError;
        }
        this.snakbarService.openSnackbar(
          this.responseMessage,
          GlobalConstants.error
        );
      }
    );
  }
  downloadFile(fileName: any) {
    var data = {
      uuid: fileName,
    };
    this.billService.getPdf(data).subscribe((response: any) => {
      saveAs(response, fileName + '.pdf');
    });
  }
}
