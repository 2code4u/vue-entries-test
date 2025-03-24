<script setup lang="ts">
  import { ref } from 'vue'
  import { useEntriesStore } from '@/stores/entries'

  const entriesStore = useEntriesStore()

  const type = ref('')
  const dateRange = ref([])
</script>

<template>
  <v-form @submit="entriesStore.loadList({})">
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <v-select
            v-model="type"
            :items="[{title: 'Зачисление', value: 'income'}, {title: 'Списание', value: 'expense'}]"
            label="Тип"
            clearable
            variant="outlined"
          />
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-date-input
            v-model="dateRange"
            first-day-of-week="1"
            label="Выберите диапозон"
            max-width="368"
            variant="outlined"
            multiple="range"
          />
        </v-col>

        <v-col
          cols="12"
          md="4"
          class="d-flex align-center"
        >
          <v-spacer />
          <v-btn
            variant="flat"
            color="indigo-darken-3"
            @click="entriesStore.loadList({type, 'dates': dateRange})"
          >
            <v-icon>mdi-text-search-variant</v-icon>
            <span class="ml-2">
              Запросить
            </span>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>