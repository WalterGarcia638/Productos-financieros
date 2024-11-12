import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ProductInterface } from '../models/ProductInterface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = 'http://localhost:3002/bp/products';

  constructor(private http: HttpClient) { }

  /*getProducts(): Observable<ProductInterface[]> {
    return this.http.get<ProductInterface[]>(this.apiUrl);
  }*/
  getProducts(): Observable<ProductInterface[]> {
    // Utilizamos `map` para extraer `data` de la respuesta.
    return this.http.get<{ data: ProductInterface[] }>(this.apiUrl).pipe(
      map(response => response.data)
    );
  }

  createProduct(product: ProductInterface): Observable<any> {
    return this.http.post(this.apiUrl, product);
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  
}
