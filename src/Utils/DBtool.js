require('dotenv').config()



class DBtool {
    constructor(name, year) {
      this.name = name;
      this.year = year;
    }

    static call(flag, sql, params) {
        //MAKE THE CALL TO THE DATABASE USING THE FLAG
    }
  }