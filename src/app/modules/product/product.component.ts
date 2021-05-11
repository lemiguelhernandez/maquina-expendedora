import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/model/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input()
  value: Product;

  @Output() select: EventEmitter<any> = new EventEmitter();

  selected = false;

  constructor() { }

  ngOnInit(): void {
  }

  onSelect() {
    this.select.emit(this.value);
  }
}
