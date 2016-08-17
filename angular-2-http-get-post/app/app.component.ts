import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/common';

import { TodoComponent } from 'app/todo.component';
import { TodoService } from 'app/todo.service';

@Component({
  selector: 'todo-app',
  template: `
    <p>Only implimented a simple post and delete</p>
    
    <h3>Component 1</h3>
    <todo-component></todo-component>
    
    <br /><br />
    
    <h3>Component 2</h3>
    <todo-component></todo-component>
  `
})
export class AppComponent {
  constructor() { }
}