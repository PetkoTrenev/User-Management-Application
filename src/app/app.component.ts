import {Component, OnInit} from '@angular/core';

// @ts-ignore
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'User Management App';

  constructor() {
  }

  ngOnInit(): void {
  }
}
