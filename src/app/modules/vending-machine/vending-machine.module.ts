import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendingMachineComponent } from './vending-machine.component';
import { ProductModule } from '../product/product.module';
import { SharedLibsModule } from 'src/app/shared/shared-libs.module';

@NgModule({
  declarations: [
    VendingMachineComponent
  ],
  imports: [
    CommonModule,
    SharedLibsModule,
    ProductModule
  ], 
  exports: [
    VendingMachineComponent
  ]
})
export class VendingMachineModule { }
