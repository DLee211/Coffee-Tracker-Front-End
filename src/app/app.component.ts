import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  originalData: any[] = [];
  data: any[] = [];

  isModalOpen = false;
  isEditing = false;
  currentId: number | null = null;

  currentCoffee: any = null;

  coffeeForm!: FormGroup;

  searchDate: string;


  openModal() {
    this.isModalOpen = true;
    this.isEditing = false;
    this.coffeeForm.reset();
  }

  editData(id: number, coffee: any) {
    this.isModalOpen = true;
    this.isEditing = true;
    this.currentCoffee = coffee;
    this.coffeeForm.setValue({
      dateConsumed: coffee.dateConsumed,
      cups: coffee.cups,
      notes: coffee.notes
    });
  }

  closeModal() {
    this.isModalOpen = false;
    this.isEditing = false;
    this.currentId = null;
  }

  constructor(private apiService: ApiService, private formBuilder: FormBuilder)
  {
    this.searchDate = '';
  }


  ngOnInit() {
    this.loadData();

    this.coffeeForm = this.formBuilder.group({
      dateConsumed: ['', Validators.required],
      cups: ['', Validators.required],
      notes: ['']
    });
  }

  searchData() {
    if (this.searchDate) {
      let searchDate = new Date(this.searchDate);
      searchDate.setHours(23, 59, 59, 999);
      this.data = this.originalData.filter(item => {
        const itemDate = new Date(item.dateConsumed);
        return itemDate > searchDate;
      });
    } else {
      this.data = [...this.originalData];
    }
  }

  loadData() {
    this.apiService.getData().subscribe(data => {
      console.log(data);
      this.originalData = data;
      this.data = [...this.originalData];
    });
  }

  deleteData(id: number) {
    this.apiService.deleteData(id).subscribe(() => {
      this.loadData();
    });
  }

  addCoffee(coffee: any) {
    if (!this.coffeeForm.valid) {
      return;
    }

    if (this.isEditing) {
      this.apiService.putData(this.currentCoffee.id, coffee).subscribe(() => {
        this.loadData();
        this.closeModal();
      });
    } else {
      this.apiService.postData(coffee).subscribe(() => {
        this.loadData();
        this.closeModal();
      });
    }
  }
}
