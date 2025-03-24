
<script setup lang="ts">
  import { computed, onBeforeMount, ref } from 'vue'
  import { useEntriesStore } from '@/stores/entries'

  import EntriesFilterBar from '@/components/EntrieFilterBar.vue'

  const entriesStore = useEntriesStore()

  const list = computed(() => {
    return entriesStore.list
  })

  const headers = [
    { title: 'ID', key: 'id', sortable: false },
    { title: 'Дата', key: 'date', sortRaw},
    { title: 'Тип', key: 'type', sortable: false },
    { title: 'Сумма', key: 'amount', sortRaw },
    { title: 'Описание', key: 'description', sortable: false },
  ]

  const mapTypes = {
    'income': 'Зачисление',
    'expense': 'Списание',
  }

  let currentSort = ref('asc')

  function sortOnField(isSorted: boolean, header: string | null) {
    if (isSorted) {
      entriesStore.loadList({'sort': {'type': currentSort.value, 'field': header || ''}})
    }
  }

  function sortRaw(val: string, next: string) {
    if (val === list.value[0]) {
      currentSort.value = 'asc'
    } else
    if (next === list.value[0]) {
      currentSort.value = 'desc'
    }
    return 0
  }

  onBeforeMount(() =>{
    entriesStore.initStore()
  })
</script>

<template>
  <v-card class="ma-4">
    <v-toolbar color="primary" class="mb-4">
      <v-toolbar-title>
        Мои транзакции
      </v-toolbar-title>

      <v-spacer></v-spacer>
    </v-toolbar>

    <EntriesFilterBar />

    <v-divider :thickness="2"></v-divider>

    <v-data-table
        :headers="headers"
        :items="list"
        :items-length="list?.length"
      >
      <template v-slot:header.date="{ column, getSortIcon, isSorted }">
        <div @click="sortOnField(isSorted(column), column.key)">
          <span
            class="me-2 cursor-pointer"
            v-text="column.title" 
          />
  
          <v-icon
            v-show="isSorted(column)"
            :icon="getSortIcon(column)"
            color="medium-emphasis"
          />
        </div>
      </template>

      <template v-slot:header.amount="{ column, getSortIcon, isSorted }">
        <div @click="sortOnField(isSorted(column), column.key)">
          <span
            class="me-2 cursor-pointer"
            v-text="column.title" 
          />
  
          <v-icon
            v-show="isSorted(column)"
            :icon="getSortIcon(column)"
            color="medium-emphasis"
          />
        </div>
      </template>
      
      <template v-slot:item.type="{ item }">
        <div 
          v-if="item.type === 'income'"
          class="text-green-darken-1"
         >
          <v-icon>mdi-plus</v-icon>
          <span class="ml-4">
            {{ mapTypes['income'] }}
          </span>
        </div>

        <div 
          v-if="item.type === 'expense'" 
          class="text-orange-darken-4"
        >
          <v-icon>mdi-minus</v-icon>
          <span class="ml-4">
            {{ mapTypes['expense'] }}
          </span>
        </div>
      </template>
    </v-data-table>
  </v-card>
</template>

<style>
  .v-data-table tr th {
    font-size: 24px !important;
  }
</style>