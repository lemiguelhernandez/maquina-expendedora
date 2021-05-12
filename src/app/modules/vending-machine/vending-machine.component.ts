import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '../product/product.service';
import { Product } from 'src/app/model/product.model';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ValidatorRunner, AutomatonRunner } from 'src/app/runner/automaton.runner';

@Component({
  selector: 'app-vending-machine',
  templateUrl: './vending-machine.component.html',
  styleUrls: ['./vending-machine.component.scss']
})
export class VendingMachineComponent implements OnInit, ValidatorRunner {

  @Input()
  automatonRunner: AutomatonRunner;
  
  MAX_COLUMNS = 3;
  MAX_VALUE_TO_PAY = 5000;
  renderProducts: any[] = [];
  totalPay = 0;
  totalInputMoney = 0;
  lastProduct: Product;
  isFinish = false;

  constructor(private productService: ProductService) { }  

  ngOnInit(): void {
    this.automatonRunner.setValidator(this);
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

  onCountOption(count: number) {
    this.onSelectProduct(this.lastProduct, count - 1);
    this.lastProduct = null;
  }

  onSelectProduct(product: Product, count = 1) {
    this.lastProduct = product;
    const total = this.totalPay + (product.price * count);
    if (total > this.MAX_VALUE_TO_PAY) {
      alert(`¡${total} sobrepasa el valor máximo permitido de ${this.MAX_VALUE_TO_PAY}!`)
      return;
    }

    this.totalPay = total;
  }

  onFinish() {
    this.isFinish = true;
    this.automatonRunner.run();
  }

  addAvailableBalance(coin: number) {
    const newTotalInputMoney = this.totalInputMoney + coin;
    if (newTotalInputMoney > this.totalPay) {
      alert(`¡${newTotalInputMoney} sobrepasa el valor total ${this.totalPay}!`)
      return;
    }
    this.totalInputMoney = newTotalInputMoney;
    this.automatonRunner.run();
  }

  reset() {
    this.isFinish = false;
    this.lastProduct = null;
    this.totalInputMoney = this.totalPay = 0;
    this.automatonRunner.reset();
  }

  meets(symbol: string) {
    switch(symbol) {
      case 'FIN':
        return this.isFinish;
      case 'NV': 
        const apply = this.totalInputMoney != this.totalPay;
        if (apply) {
          this.automatonRunner.resetNext = true;
          alert(`Falta dinero ${this.totalPay - this.totalInputMoney}`);
        }
        return apply;
      case 'SV':
        return this.totalInputMoney === this.totalPay;
      case 'EP': 
        this.lastProduct = null;
        this.totalInputMoney = this.totalPay = 0;
        return true;
      case 'IM':
        this.isFinish = false;
        return this.totalInputMoney > 0;
    }
    return false;
  }

  canContinue(symbol: string) {
    switch(symbol) {
      case 'SV': 
      case 'FIN': 
        return true;
    }
    return false;
  }

}
