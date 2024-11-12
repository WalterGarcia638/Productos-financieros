import { TestBed } from '@angular/core/testing';
import { ProductsService } from './products.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { ProductInterface } from '../models/ProductInterface';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpClientMock: {
    get: jest.Mock;
    post: jest.Mock;
    delete: jest.Mock;
    put: jest.Mock;
  };

  beforeEach(() => {
    httpClientMock = {
      get: jest.fn(),
      post: jest.fn(),
      delete: jest.fn(),
      put: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        ProductsService,
        { provide: HttpClient, useValue: httpClientMock },
      ],
    });

    service = TestBed.inject(ProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getProducts', () => {
    it('should return expected products', (done) => {
      const expectedProducts: ProductInterface[] = [
        {
          id: '1',
          name: 'Producto 1',
          description: 'Descripción del Producto 1',
          logo: 'logo1.png',
          date_release: new Date('2022-01-01'),
          date_revision: new Date('2022-06-01'),
        },
        {
          id: '2',
          name: 'Producto 2',
          description: 'Descripción del Producto 2',
          logo: 'logo2.png',
          date_release: new Date('2022-02-01'),
          date_revision: new Date('2022-07-01'),
        },
      ];

      httpClientMock.get.mockReturnValue(of({ data: expectedProducts }));

      service.getProducts().subscribe({
        next: (products) => {
          expect(products).toEqual(expectedProducts);
          expect(httpClientMock.get).toHaveBeenCalledWith(service['apiUrl']);
          done();
        },
        error: done.fail,
      });
    });
  });

  describe('#createProduct', () => {
    it('should create a product and return it', (done) => {
      const newProduct: ProductInterface = {
        id: '3',
        name: 'Producto 3',
        description: 'Descripción del Producto 3',
        logo: 'logo3.png',
        date_release: new Date('2022-03-01'),
        date_revision: new Date('2022-08-01'),
      };

      httpClientMock.post.mockReturnValue(of(newProduct));

      service.createProduct(newProduct).subscribe({
        next: (product) => {
          expect(product).toEqual(newProduct);
          expect(httpClientMock.post).toHaveBeenCalledWith(
            service['apiUrl'],
            newProduct
          );
          done();
        },
        error: done.fail,
      });
    });
  });

  describe('#deleteProduct', () => {
    it('should delete the product', (done) => {
      const productId = '1';

      httpClientMock.delete.mockReturnValue(of({}));

      service.deleteProduct(productId).subscribe({
        next: (response) => {
          expect(response).toEqual({});
          expect(httpClientMock.delete).toHaveBeenCalledWith(
            `${service['apiUrl']}/${productId}`
          );
          done();
        },
        error: done.fail,
      });
    });
  });

  describe('#updateProduct', () => {
    it('should update the product and return it', (done) => {
      const updatedProduct: ProductInterface = {
        id: '1',
        name: 'Producto Actualizado',
        description: 'Descripción Actualizada',
        logo: 'updated_logo.png',
        date_release: new Date('2022-01-01'),
        date_revision: new Date('2022-06-01'),
      };

      httpClientMock.put.mockReturnValue(of(updatedProduct));

      service.updateProduct(updatedProduct.id, updatedProduct).subscribe({
        next: (product) => {
          expect(product).toEqual(updatedProduct);
          expect(httpClientMock.put).toHaveBeenCalledWith(
            `${service['apiUrl']}/${updatedProduct.id}`,
            updatedProduct
          );
          done();
        },
        error: done.fail,
      });
    });
  });
});
