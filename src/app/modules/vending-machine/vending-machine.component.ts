import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product/product.service';
import { Product } from 'src/app/model/product.model';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-vending-machine',
  templateUrl: './vending-machine.component.html',
  styleUrls: ['./vending-machine.component.scss']
})
export class VendingMachineComponent implements OnInit {

  MAX_COLUMNS = 3;
  renderProducts: any[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.fetch()
    .subscribe(
      (res: HttpResponse<Product[]>) => {
         this.prepareList(res.body);
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  prepareList(products: Product[]) {
    const totalPage = products.length / this.MAX_COLUMNS;
    for (let page = 1; page <= totalPage; page++) {
      this.renderProducts.push(this.toPage(products, page, this.MAX_COLUMNS));
    }
  }

  toPage = (products: Product[], pageNumber = 1, pageSize = 10) => {
    const start = (pageNumber - 1) * pageSize;
    const end = pageNumber * pageSize;
    return products.slice(start, end);
  }

  onError(error: string) {
    alert(error);
  }
}
