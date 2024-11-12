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
  }

  // Enviar el formulario
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
  




  // Obtener productos filtrados
  get filteredProducts(): ProductInterface[] {
    if (!this.searchTerm) {
      return this.products;
    }
    return this.products.filter(product =>
      product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
