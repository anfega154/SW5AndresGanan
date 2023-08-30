import db from './db';

const createTables = () => {
  db.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, user TEXT UNIQUE, email TEXT, password TEXT)',
      [],
      () => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS registro (id INTEGER PRIMARY KEY AUTOINCREMENT, user TEXT, fecha DATE, horainicio TEXT, horafin DATE, franjaingreso TEXT,franjasalida TEXT,total REAL)',
          [],
          () => {
            tx.executeSql(
              'CREATE TABLE IF NOT EXISTS novedades (id INTEGER PRIMARY KEY AUTOINCREMENT, user TEXT, tipo TEXT, duracion INTEGER, inicio DATE, fin DATE)',
              [],
              () => {
                console.log('Tablas creadas correctamente');
              },
              (error) => {
                console.error('Error al crear la tabla de novedades:', error);
              }
            );
          },
          (error) => {
            console.error('Error al crear la tabla de registro:', error);
          }
        );
      },
      (error) => {
        console.error('Error al crear la tabla de usuarios:', error);
      }
    );
  });
};


const insertUser = (user, email, password) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT user FROM users WHERE user = ?',
        [user],
        (tx, result) => {
          if (result.rows.length > 0) {
            console.error('El usuario ya existe');
            reject([false, 'El usuario ya existe']);
          } else {
            tx.executeSql(
              'INSERT INTO users (user, email, password) VALUES (?, ?, ?)',
              [user, email, password],
              () => {
                console.log('Usuario insertado correctamente');
                resolve(true);
              },
              (error) => {
                console.error('Error al insertar el Usuario:', error);
                reject(false);
              }
            );
          }
        },
        (error) => {
          console.error('Error al verificar el usuario:', error);
          reject(false);
        }
      );
    });
  });
};


const insertRegistro = (user, fecha, horainicio, horafin, franjaingreso,franjasalida,total) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO registro (user, fecha, horainicio, horafin, franjaingreso,franjasalida,total) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [user, fecha, horainicio, horafin, franjaingreso,franjasalida,total],
        () => {
          console.log('Registro insertado correctamente');
          resolve(true);
        },
        (error) => {
          console.error('Error al insertar el Registro:', error);
          reject(false);
        }
      );
    });
  });
};

const UpdateRegistro = (user, horafin,franjasalida,total) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE registro SET horafin = ?,franjasalida=?, total=?  WHERE user = ?',
        [horafin, franjasalida,total, user],
        (tx, result) => {
          if (result.rowsAffected > 0) {
            console.log('Registro actualizado correctamente');
            resolve(true);
          } else {
            console.log('No se encontró el registro para actualizar');
            resolve(false);
          }
        },
        (error) => {
          console.error('Error al actualizar el Registro:', error);
          reject(false);
        }
      );
    });
  });
};

const insertNovedad = (user, tipo, duracion, inicio, fin) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO novedades (user, tipo, duracion, inicio, fin) VALUES (?, ?, ?, ?, ?)',
        [user, tipo, duracion, inicio, fin],
        () => {
          console.log('Novedad insertada correctamente');
          resolve(true);
        },
        (error) => {
          console.error('Error al insertar la Novedad:', error);
          reject(false);
        }
      );
    });
  });
};

const getUsers = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM users',
        [],
        (tx, result) => {
          const users = [];
          for (let i = 0; i < result.rows.length; i++) {
            users.push(result.rows.item(i));
          }
          resolve(users);
        },
        (error) => {
          console.error('Error al obtener los usuarios:', error);
          reject(error);
        }
      );
    });
  });
};

const getHour = (user) =>{
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT horainicio FROM registro WHERE user = ? AND horafin="null"',
        [user],
        (tx,result) => {
          resolve(result.rows.item(0));
        },
        (error) => {
          console.error('Error al obtener la hora:', error);
          reject(error);
        }
      );
    });
  });
}

const getRecords = (user, start, end) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM registro WHERE user = ? AND fecha BETWEEN ? AND ?',
        [user,start, end],
        (tx, result) => {
          const records = [];
          for (let i = 0; i < result.rows.length; i++) {
            records.push(result.rows.item(i));
          }
          console.log(JSON.stringify(records));
          resolve(records);
        },
        (error) => {
          console.error('Error al obtener los registros:', error);
          reject(error);
        }
      );
    });
  });
};



  const validateCredentials = (user, password) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM users WHERE user = ? AND password = ?',
          [user, password],
          (tx, result) => {
            if (result.rows.length === 1) {
              resolve(true);
            } else {
              resolve(false);
            }
          },
          (error) => {
            console.error('Error al validar las credenciales:', error);
            reject(error);
          }
        );
      });
    });
  }

  const UserExist = (user) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM users WHERE user = ?',
          [user],
          (tx, result) => {
            if (result.rows.length === 1) {
              resolve(true);
            } else {
              resolve(false);
            }
          },
          (error) => {
            console.error('error:', error);
            reject(error);
          }
        );
      });
    });

  }

  const DropTables = () => {
    db.transaction(tx => {
      tx.executeSql('DROP TABLE IF EXISTS users;');
      tx.executeSql('DROP TABLE IF EXISTS registro;');
      tx.executeSql('DROP TABLE IF EXISTS novedades;');
    }, error => {
      console.error('Error dropping tables:', error);
    }, () => {
      console.log('Tables dropped successfully.');
    });
  }



  export { createTables, insertUser, insertRegistro, insertNovedad, getUsers, validateCredentials, DropTables, UserExist, UpdateRegistro,getRecords,getHour };

