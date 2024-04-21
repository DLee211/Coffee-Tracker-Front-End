import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  data: any[] = [];

  isModalOpen = false; // Add this line
  isEditing = false;
  currentId: number | null = null;

  currentCoffee: any = null; // Add this line

  coffeeForm!: FormGroup;

  openModal() {
    this.isModalOpen = true;
    this.isEditing = false;
    this.coffeeForm.reset();
  }

  editData(id: number, coffee: any) {
    this.isModalOpen = true;
    this.isEditing = true;
    this.currentCoffee = coffee; // Save the whole coffee object
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

  constructor(private apiService: ApiService, private formBuilder: FormBuilder) { }


  ngOnInit() {
    this.loadData();

    this.coffeeForm = this.formBuilder.group({
      dateConsumed: ['', Validators.required],
      cups: ['', Validators.required],
      notes: ['']
    });
  }

  loadData() {
    this.apiService.getData().subscribe(data => {
      console.log(data);
      this.data = data;
    });
  }

  deleteData(id: number) {
    this.apiService.deleteData(id).subscribe(() => {
      this.loadData(); // reload the data
    });
  }

  addCoffee(coffee: any) {
    if (!this.coffeeForm.valid) {
      return;
    }

    if (this.isEditing) {
      this.apiService.putData(this.currentCoffee.id, coffee).subscribe(() => { // Use the id from currentCoffee
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
