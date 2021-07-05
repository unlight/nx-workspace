import { Injectable } from '@nestjs/common';

let storeNextId = 0;
const store: any[] = [];

@Injectable()
export class UserRepository {
  create(data: any): Promise<any> {
    const item = {
      id: ++storeNextId,
      title: data.title,
      completed: false,
    };
    store.push(item);

    return Promise.resolve(item);
  }

  // findById(id: number): Promise<any | undefined> {
  //     const result = store.find(item => item.id === id);

  //     return Promise.resolve(result);
  // }

  // findAll(): Promise<any[]> {
  //     const result = [...store];

  //     return Promise.resolve(result);
  // }
}
