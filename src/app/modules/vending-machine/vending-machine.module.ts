import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendingMachineComponent } from './vending-machine.component';
import { ProductModule } from '../product/product.module';



@NgModule({
  declarations: [
    VendingMachineComponent
  ],
  imports: [
    CommonModule,
    ProductModule
  ], 
  exports: [
    VendingMachineComponent
  ]
})
export class VendingMachineModule { }
