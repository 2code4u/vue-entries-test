import { defineStore } from "pinia"
import { type EntriesList, type EntriesItem } from "@/interfaces"

interface EntriesStore {
  itemModel: EntriesItem
  list: EntriesList
}

export const useEntriesStore = defineStore("entries", {
  state: (): EntriesStore => {
    return {
      itemModel: {
        id: '',
        tags: '',
        tagsFormated: [],
        type: 'Локальная',
        login: '',
        pass: '',
      },
      list: [
        {
          id: crypto?.randomUUID(),
          tags: '',
          tagsFormated: [],
          type: '',
          login: '',
          pass: '',
        }
      ],
    };
  },
  actions: {
    addElement() {
      this.list.push({...this.itemModel, id: crypto?.randomUUID()})
    },
    removeElement(id: string) {
      const updateList = this.list.filter(el => el.id !== id)
      this.list = updateList
    },
    saveToStorage() {
      if(localStorage) {
        const strFormat = JSON.stringify(this.list)
        localStorage.setItem('entries-local', strFormat)
      }
    },
    initStore() {
      if(localStorage) {
        const strFormat = localStorage.getItem('entries-local')
        if (strFormat) {
          try {
            this.list = JSON.parse(strFormat)
          } catch (error) {}
        }
      }
    },
  },
})