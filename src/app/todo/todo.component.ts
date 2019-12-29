import { Component, OnInit } from '@angular/core';
import { TodoService } from './shared/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  providers: [TodoService]
})
export class TodoComponent implements OnInit {
  todoListArray: any[];
  todoTitle: string = '';
  errorMessage: string = '';
  constructor(private toDoService: TodoService) { }

  ngOnInit() {
    this.toDoService.getTodoList().snapshotChanges()
      .subscribe(item => {
        this.todoListArray = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x['$key'] = element.key;
          this.todoListArray.push(x);
        });

        // sort array false first
        this.todoListArray.sort((a, b) => {
          return a.isChecked - b.isChecked;
        });
      });
  }

  /**
   * this method will fire to not add repeated.
   *
   * @param text
   */
  private repeatValidation(text) {
    let valid = true;
    for ( let title of this.todoListArray.map(e => e.title) ) {
      if ( title === text ) {
        valid = false;
      }
    }
    return valid;
  }

  /**
   * this method will fire to add todo.
   */
  public onAddTodoClick() {
    if ( this.todoTitle && this.todoTitle.length > 0 ) {
      if ( this.repeatValidation(this.todoTitle) ) {
        this.toDoService.addTitle(this.todoTitle);
        this.todoTitle = null;
      } else {
        this.errorMessage = 'Duplicate value!';
      }
    } else {
      this.errorMessage = 'Please enter title for todo';
    }
  }

  public alterCheck($key: string, isChecked) {
    this.toDoService.toggleCheckTitle($key, !isChecked);
  }

  public onDeleteTodoClick($key: string) {
    if ( confirm('Confirm Delete Action') ) {
      this.toDoService.removeTitle($key);
    }
  }

}
