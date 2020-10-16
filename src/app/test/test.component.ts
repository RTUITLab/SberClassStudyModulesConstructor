import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor() { }

  data:number[] = [1, 2, 3 ,4];

  ngOnInit(): void {
  }

  addNum(num: number){
    this.data.push(num);
  }
}
