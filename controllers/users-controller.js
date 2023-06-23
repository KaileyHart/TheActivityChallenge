import { openDatabase } from "expo-sqlite";

export const db = openDatabase('ActivityChallenge');

console.log("db",db);

// https://medium.com/swlh/react-native-with-sqlite-1ec64702e35e