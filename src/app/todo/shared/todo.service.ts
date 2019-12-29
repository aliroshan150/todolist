import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';


@Injectable()
export class TodoService {
  todoList: AngularFireList<any>;

  constructor(private firebasedb: AngularFireDatabase) { }

  public getTodoList() {
    this.todoList = this.firebasedb.list('titles');
    return this.todoList;
  }

  public addTitle(title: string) {
    this.todoList.push({
      title,
      isChecked: false
    });
    console.log(this.todoList);
  }

  public toggleCheckTitle($key: string, flag: boolean) {
    // todo: another way
    //  this.todoList[$key] = flag;
    this.todoList.update($key, { isChecked: flag });
  }

  public removeTitle($key: string) {
    // todo: another way
    //  this.todoList.splice($key, 1) = flag;
    this.todoList.remove($key);
  }
}
