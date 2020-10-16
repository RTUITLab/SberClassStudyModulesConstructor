import { Component } from '@angular/core';
import { TestComponent } from './test/test.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  count: number = 0;
  testcomp: TestComponent;

  constructor(testc: TestComponent){
    this.testcomp=testc;
  }

  onClick(){
    this.count++;
    this.testcomp.addNum(this.count);
  }

}
