import DataBase from './db/DataBase.ts'

export default class Api {
  public dataBase: DataBase

  constructor() {
    this.dataBase = new DataBase()
  }
}