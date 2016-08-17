import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

export interface Todo {
  id: any;
  createdAt: number;
  value: string;
}

@Injectable() 
export class TodoService {
  private _todos$: Subject<Todo[]>; 
  private baseUrl: string;
  private dataStore: {
    todos: Todo[]
  };
     
  constructor(private http: Http) {
    this.baseUrl  = 'http://56e05c3213da80110013eba3.mockapi.io/api';
    this.dataStore = { todos: [] };
    this._todos$ = <Subject<Todo[]>>new Subject();
  }
    
  get todos$() {
    return this._todos$.asObservable();
  }
     
  loadAll() {
    this.http.get(`${this.baseUrl}/todos`).map(response => response.json()).subscribe(data => {
      this.dataStore.todos = data;
      this._todos$.next(this.dataStore.todos);
    }, error => console.log('Could not load todos.'));
  }
    
  load(id: any) {
    this.http.get(`${this.baseUrl}/todos/${id}`).map(response => response.json()).subscribe(data => {
      let notFound = true;

      this.dataStore.todos.forEach((item, index) => {
        if(item.id === data.id) {
          this.dataStore.todos[index] = data;
          notFound = false;
        }
      });

      if (notFound) {
        this.dataStore.todos.push(data);
      }
        
      this._todos$.next(this.dataStore.todos);
    }, error => console.log('Could not load todo.'));
  }
     
  create(todo: Todo) {
    this.http.post(`${this.baseUrl}/todos`, JSON.stringify(todo))
      .map(response => response.json()).subscribe(data => {
        this.dataStore.todos.push(data);   
        this._todos$.next(this.dataStore.todos);
      }, error => console.log('Could not create todo.'));
  }
     
  update(todo: Todo) {
    this.http.put(`${this.baseUrl}/todos/${todo.id}`, JSON.stringify(todo))
      .map(response => response.json()).subscribe(data => {
        this.dataStore.todos.forEach((todo, i) => {
          if (todo.id === data.id) { this.dataStore.todos[i] = data; }
        });
   
      this._todos$.next(this.dataStore.todos);
    }, error => console.log('Could not update todo.'));
  }
     
  remove(todoId: number) {
    this.http.delete(`${this.baseUrl}/todos/${todoId}`).subscribe(response => {
      this.dataStore.todos.forEach((t, i) => {
        if (t.id === todoId) { this.dataStore.todos.splice(i, 1); }
      });
   
      this._todos$.next(this.dataStore.todos);
    }, error => console.log('Could not delete todo.'));
  }
}