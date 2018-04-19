import { Component } from '@angular/core';

/**
 * Generated class for the Cal2Component component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'cal2',
  templateUrl: 'cal2.html'
})
export class Cal2Component {

  text: string;

  constructor() {
    console.log('Hello Cal2Component Component');
    this.text = 'Hello World';
  }

}
