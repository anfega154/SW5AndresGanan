import SQLite from 'react-native-sqlite-storage';

const databaseName = 'controlmina'; 
const databaseVersion = '1.0';
const databaseSize = 200000; 

const db = SQLite.openDatabase(
  {
    name: databaseName,
    version: databaseVersion,
    size: databaseSize,
  },
  () => {
    console.log('Base de datos abierta correctamente');
  },
  (error) => {
    console.error('Error al abrir la base de datos:', error);
  }
);

export default db;
