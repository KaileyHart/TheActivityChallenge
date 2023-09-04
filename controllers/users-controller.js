import { openDatabase } from "expo-sqlite";

export const db = openDatabase('ActivityChallenge');

// db.transaction(callback, error, success);

console.log("db",db);

// const loadData = () => {

    // db.transaction(tx => {
  
    //   tx.executeSql(
    //     "create table if not exists DataTable (id integer primary key not null, column_1 int, column_2 int, column_3 text);",
    //     []
    //   );
  
    //   tx.executeSql(
    //     "insert into DataTable (column_1, column_2, column_3) values (?, ?, ?)",
    //     [argument_1, argument_2, argument_3]
    //   );
  
//       tx.executeSql(
//         "select * from users",
//         [],
//         (_, { rows: { _array } }) => setScores(_array),
//         () => console.log("error fetching")
//       );
  
//     });
//   };
// console.log("data",data);


// https://medium.com/swlh/react-native-with-sqlite-1ec64702e35e