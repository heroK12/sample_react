import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { faker } from '@faker-js/faker';

export const App = () => {
    type TodoType = {
      userId: number;
      id: number;
      title: string;
      completed: boolean;
    };
    
    const [todos, setTodos] = useState<Array<TodoType>>([]);
    
    //axiosで取得したデータに上記で定義したTodoType型を指定する
    const onClickFetchData = () => {
      axios
        .get<Array<TodoType>>("https://jsonplaceholder.typicode.com/todos")
        .then((res) => {
          setTodos(res.data);
        });
    };

    // 初期化が必要
    let dummyData: Array<TodoType> = [];

    // ダミーデータを作る
    let setDummyData = (): void => {
      let createDummyData = {
        userId: faker.datatype.number(),
        id: faker.datatype.number(),
        title: faker.company.bsNoun(),
        completed: faker.datatype.boolean(),
      }
      // console.log(createDummyData);
      // console.log(dummyData);
      // 配列に入れる
      dummyData.push(createDummyData);
    };
    // ループでダミーデータを配列に入れる
    const onClickSetData = () => {
      for(let i = 0; i < 5; i++){
        setDummyData()
      }
      setTodos(dummyData);
    }
  
  return (
    <div className="App">
      <button onClick={onClickSetData}>データ取得</button>
      {todos.map((data,index)=><p key={index}>{data.id}</p>)}
    </div>
  );
}

export default App;
