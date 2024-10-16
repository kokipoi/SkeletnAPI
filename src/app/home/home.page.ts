import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  items: any[] = [];
  filteredItems: any[] = [];
  newItem = { nombre: '', edad: null };
  editingItem: any = null;
  searchTerm: string = '';

  constructor(private apiService: ApiserviceService) {}

  ngOnInit() {
    this.loadItems();
  }

  // Cargar los clientes existentes
  loadItems() {
    this.apiService.getItems().subscribe((data) => {
      this.items = data;
      this.filteredItems = this.items;
    });
  }

  // Filtrar los items en base al término de búsqueda
  filterItems() {
    this.filteredItems = this.items.filter(item => {
      return item.nombre.toLowerCase().includes(this.searchTerm.toLowerCase());
    });
  }

  // Agregar un nuevo cliente
  addItem() {
    const newCliente = {
      id: this.getNextId(),
      nombre: this.newItem.nombre,
      edad: this.newItem.edad
    };

    this.apiService.addItem(newCliente).subscribe(() => {
      this.loadItems();
      this.newItem = { nombre: '', edad: null };
    });
  }

  // Obtener el siguiente id disponible
  getNextId(): number {
    if (this.items.length === 0) {
      return 1;
    }
    
    return Math.max(...this.items.map(item => Number(item.id))) + 1;
  }

  // Iniciar la edición de un item
  editItem(item: any) {
    this.editingItem = { ...item };
  }

  // Guardar los cambios de la edición
  saveEdit() {
    if (this.editingItem) {
      this.apiService.updateItem(this.editingItem.id, this.editingItem).subscribe(() => {
        this.loadItems();
        this.editingItem = null;
      });
    }
  }

  // Cancelar la edición
  cancelEdit() {
    this.editingItem = null;
  }

  // Eliminar un item
  deleteItem(id: number) {
    this.apiService.deleteItem(id).subscribe(() => {
      this.loadItems();
    });
  }
}