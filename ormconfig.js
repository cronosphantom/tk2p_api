
let host = '45.33.29.248';
let username = "edrivenadmin";
let password = "Tirefoam2005!!!!!";
let database = "tk2p_dev";
let synchronize = process.env.DB_SYNC;;

if (process.env.NODE_ENV === "development") {
   host = "localhost";
   username = "root";
   password = "123123";
   database = "typeormtest";
   synchronize = false;
}

module.exports = {
   "type": "postgres",
   "host": host,
   "port": 5432,
   "username": username,
   "password": password,
   "database": database,
   "synchronize": true,
   "entities": [
      "src/models/*.ts"
   ],
   "migrations": [
      "src/migration/**/*.ts"
   ],
   "subscribers": [
      "src/subscriber/**/*.ts"
   ],
   "cli": {
      "entitiesDir": "src/entity",
      "migrationsDir": "src/migration",
      "subscribersDir": "src/subscriber"
   }
}
