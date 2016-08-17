import { Component } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';

import { TodoService } from 'app/todo.service';

@Component({
  selector: 'todo-component',
  template: `
    <div>
      <form [formGroup]="todoForm" (submit)="onSubmit()">
         <button>Add Item</button><br />
      </form>
      
      <p>
        {{singleTodo$ | async | json}}
      </p>
      
      <div *ngFor="let todo of todos$ | async">
        {{ todo.value }} <button (click)="deleteTodo(todo.id)">x</button>
      </div>
    </div>
  `
})
export class TodoComponent {
  todos$: Observable<Todo[]>;
  singleTodo$: Observable<Todo>;
  
  constructor(
    private todoService: TodoService, 
    private formBuilder: FormBuilder) {
      
    this.todoForm = this.formBuilder.group({
      'todo': ['', Validators.required]
    });
  }
  
  ngOnInit() {
    this.todos$ = this.todoService.todos$;
    this.singleTodo$ = this.todoService.todos$
      .map(todos => todos.find(item => item.id === '1'));
    
    this.todoService.loadAll();
    this.todoService.load('1');
  }
  
  onSubmit() {
    this.todoService.create({ value: this.todoForm.controls.todo.value });
  }
  
  deleteTodo(todoId: number) {
    this.todoService.remove(todoId);
  }
}