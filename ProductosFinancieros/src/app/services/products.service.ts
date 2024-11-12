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

  updateProduct(id: string, product: ProductInterface): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, product);
  }

  verifyIdExists(id: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/verification/${id}`);
  }

  // Método para obtener un producto por ID (opcional, si lo necesitas)
  getProductById(id: string): Observable<ProductInterface> {
    return this.http.get<ProductInterface>(`${this.apiUrl}/${id}`);
  }
}
