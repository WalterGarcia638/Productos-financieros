import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ProductInterface } from '../../models/ProductInterface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: ProductInterface[] = [];
  searchTerm: string = '';
  showModal: boolean = false;
  showDeleteModal: boolean = false;
  selectedProduct: ProductInterface | null = null;
  showEditModal: boolean = false;

  idExists: boolean = false;
  invalidReleaseDate: boolean = false;
  invalidRevisionDate: boolean = false;

  editProduct: ProductInterface = {
    id: '',
    name: '',
    description: '',
    logo: '',
    date_release: new Date(),
    date_revision: new Date(),
  };

  product: ProductInterface = {
    id: '',
    name: '',
    description: '',
    logo: '',
    date_release: new Date(),
    date_revision: new Date(),
  };

  constructor(private productService: ProductsService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        console.log('Productos cargados:', this.products);
      },
      error: (error) => {
        console.error('Error al cargar productos:', error);
      },
    });
  }

  // Mostrar el modal
  openModal() {
    this.showModal = true;
  }

  // Ocultar el modal
  closeModal() {
    this.showModal = false;
    this.resetForm();
  }

  // Reiniciar el formulario
  resetForm() {
    this.product = {
      id: '',
      name: '',
      description: '',
      logo: '',
      date_release: new Date(),
      date_revision: new Date(),
    };
    this.idExists = false;
    this.invalidReleaseDate = false;
    this.invalidRevisionDate = false;
  }

  // Verificar si el ID ya existe
  checkIdExists() {
    if (this.product.id.length >= 3 && this.product.id.length <= 10) {
      this.productService.verifyIdExists(this.product.id).subscribe({
        next: (exists) => {
          this.idExists = exists;
        },
        error: (error) => {
          console.error('Error al verificar ID:', error);
          this.idExists = false; // Asumimos que no existe en caso de error
        },
      });
    } else {
      this.idExists = false; // Resetear si el ID no cumple con las validaciones de longitud
    }
  }

  // Validar fecha de liberación
  validateReleaseDate() {
    const today = new Date();
    const releaseDate = new Date(this.product.date_release);
    releaseDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    this.invalidReleaseDate = releaseDate < today;
  }

  // Validar fecha de revisión
  validateRevisionDate() {
    const releaseDate = new Date(this.product.date_release);
    const revisionDate = new Date(this.product.date_revision);

    const expectedRevisionDate = new Date(releaseDate);
    expectedRevisionDate.setFullYear(expectedRevisionDate.getFullYear() + 1);
    expectedRevisionDate.setHours(0, 0, 0, 0);
    revisionDate.setHours(0, 0, 0, 0);

    this.invalidRevisionDate =
      expectedRevisionDate.getTime() !== revisionDate.getTime();
  }

  // Enviar el formulario
  submitForm() {
    if (this.idExists || this.invalidReleaseDate || this.invalidRevisionDate) {
      // No enviar si hay errores de validación personalizados
      return;
    }
    this.productService.createProduct(this.product).subscribe({
      next: (response) => {
        console.log('Producto agregado:', response);
        this.loadProducts();
        this.closeModal();
      },
      error: (error) => {
        console.error('Error al agregar producto:', error);
      },
    });
  }

  deleteProduct(id: string) {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          console.log('Producto eliminado:', id);
          this.loadProducts(); // Recargar la lista de productos después de eliminar
        },
        error: (error) => {
          console.error('Error al eliminar producto:', error);
        },
      });
    }
  }

  openDeleteModal(product: ProductInterface) {
    this.selectedProduct = product;
    this.showDeleteModal = true;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
    this.selectedProduct = null;
  }

  confirmDelete() {
    if (this.selectedProduct) {
      this.productService.deleteProduct(this.selectedProduct.id).subscribe({
        next: () => {
          console.log(`Producto eliminado: ${this.selectedProduct?.name}`);
          this.loadProducts();
          this.closeDeleteModal();
        },
        error: (error) => {
          console.error('Error al eliminar producto:', error);
        },
      });
    }
  }

  // Abrir modal de edición con datos del producto seleccionado
  openEditModal(product: ProductInterface) {
    this.editProduct = { ...product };
    this.showEditModal = true;
  }

  // Cerrar modal de edición
  closeEditModal() {
    this.showEditModal = false;
    this.resetEditForm();
  }

  // Reiniciar formulario de edición
  resetEditForm() {
    this.editProduct = {
      id: '',
      name: '',
      description: '',
      logo: '',
      date_release: new Date(),
      date_revision: new Date(),
    };
  }

  // Enviar formulario de edición
  submitEditForm() {
    this.productService
      .updateProduct(this.editProduct.id, this.editProduct)
      .subscribe({
        next: (response) => {
          console.log('Producto actualizado:', response);
          this.loadProducts();
          this.closeEditModal();
        },
        error: (error) => {
          console.error('Error al actualizar producto:', error);
        },
      });
  }

  // Obtener productos filtrados
  get filteredProducts(): ProductInterface[] {
    if (!this.searchTerm) {
      return this.products;
    }
    return this.products.filter(
      (product) =>
        product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}

/*implements OnInit {
  products: ProductInterface[] = [];
  searchTerm: string = '';
  showModal: boolean = false;
  showDeleteModal: boolean = false;
  selectedProduct: ProductInterface | null = null;
  showEditModal: boolean = false;

  editProduct: ProductInterface = {
    id: '',
    name: '',
    description: '',
    logo: '',
    date_release: new Date(),
    date_revision: new Date(),
  };

  product: ProductInterface = {
    id: '',
    name: '',
    description: '',
    logo: '',
    date_release: new Date(),
    date_revision: new Date(),
  };

  constructor(private productService: ProductsService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        console.log('Productos cargados:', this.products);
      },
      error: (error) => {
        console.error('Error al cargar productos:', error);
      }
    });
  }

  openModal() {
    this.showModal = true;
  }

 
  closeModal() {
    this.showModal = false;
    this.resetForm();
  }


  resetForm() {
    this.product = {
      id: '',
      name: '',
      description: '',
      logo: '',
      date_release: new Date(),
      date_revision: new Date(),
    };
  }


  submitForm() {
    this.productService.createProduct(this.product).subscribe({
      next: (response) => {
        console.log('Producto agregado:', response);
        this.loadProducts();
        this.closeModal();
      },
      error: (error) => {
        console.error('Error al agregar producto:', error);
      },
    });
  }

  deleteProduct(id: string) {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          console.log('Producto eliminado:', id);
          this.loadProducts(); // Recargar la lista de productos después de eliminar
        },
        error: (error) => {
          console.error('Error al eliminar producto:', error);
        }
      });
    }
  }

  openDeleteModal(product: ProductInterface) {
    this.selectedProduct = product;
    this.showDeleteModal = true;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
    this.selectedProduct = null;
  }

  confirmDelete() {
    if (this.selectedProduct) {
      this.productService.deleteProduct(this.selectedProduct.id).subscribe({
        next: () => {
          console.log(`Producto eliminado: ${this.selectedProduct?.name}`);
          this.loadProducts();
          this.closeDeleteModal();
        },
        error: (error) => {
          console.error('Error al eliminar producto:', error);
        }
      });
    }
  }

 
  openEditModal(product: ProductInterface) {
    this.editProduct = { ...product };
    this.showEditModal = true;
  }


  closeEditModal() {
    this.showEditModal = false;
    this.resetEditForm();
  }

  resetEditForm() {
    this.editProduct = {
      id: '',
      name: '',
      description: '',
      logo: '',
      date_release: new Date(),
      date_revision: new Date(),
    };
  }


  submitEditForm() {
    this.productService.updateProduct(this.editProduct.id, this.editProduct).subscribe({
      next: (response) => {
        console.log('Producto actualizado:', response);
        this.loadProducts();
        this.closeEditModal();
      },
      error: (error) => {
        console.error('Error al actualizar producto:', error);
      }
    });
  }
  





  get filteredProducts(): ProductInterface[] {
    if (!this.searchTerm) {
      return this.products;
    }
    return this.products.filter(product =>
      product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}*/
