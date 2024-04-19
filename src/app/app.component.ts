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

  coffeeForm!: FormGroup;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
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

  addCoffee(coffeeData: any) {
    this.apiService.postData(coffeeData).subscribe(() => {
      this.loadData(); // reload the data
    });
  }
}
