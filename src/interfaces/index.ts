export type EntriesList<T> = Array<T>

export interface EntriesItem {
  id: number,
  date: Date | string,
  type: string,
  amount: number,
  description: string
}

export interface FilterData {
  type?: string,
  sort?: {
    field: string,
    type: string
  },
  dates?: Array<Date | string>
}