import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  data: any[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.loadData();
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
}
