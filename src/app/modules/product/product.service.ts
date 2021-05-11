import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Product } from 'src/app/model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  fetch(): Observable<HttpResponse<Product[]>> {
    return this.http.get<Product[]>('/assets/products/products.json', { observe: 'response' });
  }

}
