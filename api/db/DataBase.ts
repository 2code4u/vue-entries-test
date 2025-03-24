import axios from "axios"

import { type FilterData } from "@/interfaces"

export default class DataBase {
  public isAuth: boolean

  constructor() {
    this.isAuth = false
  }

  async getDataList(body: FilterData) {
    const mockData = await axios.get('/local.json')

    if (!body) {
      return mockData.data
    }
    console.log(`Filter params: ` + `${JSON.stringify(body)}`)

    const {type, sort, dates} = body
    let newData = mockData.data
    
    if (type) {
      newData = newData.filter(el => {
        return el.type === type
      })
    }

    if (sort?.field) {
      newData.sort((el1, el2) => {
        if (sort.type === 'asc' || sort.type === undefined) {  
          return el1[sort.field] > el2[sort.field] ? 1
          : el1[sort.field] < el2[sort.field] ? -1 
          : 0.
        }
        if (sort.type === 'desc') {
          return el2[sort.field] > el1[sort.field] ? 1
          : el2[sort.field] < el1[sort.field] ? -1 
          : 0.
        }
      })
    }

    if (dates?.length) {
      const start = dates[0]
      const end = dates[dates.length - 1]

      newData = newData.filter(el => {
        const dateFormat = new Date(el.date) // Не стоит в цикле приводить к дате, но у нас моковая Бд и будем думать что там был бы уже формат даты
        return (dateFormat >= start) && (dateFormat <= end)
      })
    }

    return newData
  }
}
