
<script setup lang="ts">
  import { computed, onBeforeMount } from 'vue'
  import { useEntriesStore } from '@/stores/entries'

  const entriesStore = useEntriesStore()

  const list = computed(() => {
    return entriesStore.list
  })

  const headers = [
    { title: 'Метки', key: 'tags', sortable: false },
    { title: 'Тип записи', key: 'type', sortable: false },
    { title: 'Логин', key: 'login', sortable: false },
    { title: 'Пароль', key: 'pass', sortable: false },
    { key: 'actions', sortable: false },
  ]
  const optionsType = [
    { title: 'Локальная', value: 'Локальная', key: 'local' },
    { title: 'LDPA', value: 'LDPA', key: 'ldpa' },
  ]

  const validationRules = {
    required: (value: any) => !!value || 'Обязательное поле',
    maxLength: (num: number) => (value: string) => { return value?.length < num || `Не должно превышать ${num} символов`},
  }

  const computeTags = (id: any) => {
    console.log(id)
    const activeEntr = list.value.find(el => el.id === id)

    if (activeEntr && activeEntr.tagsFormated) {
      activeEntr.tagsFormated = activeEntr.tags.split(';').map(element => {
        return {text: element?.trim()}
      })
    }
  }

  function isNeedPass(item: any) {
    const ldpaType = optionsType.find(el => el.key !== 'ldpa')

    if (item.type === ldpaType?.value) {
      return true
    }
    item.pass = null
    return false
  }

  onBeforeMount(() =>{
    entriesStore.initStore()
  })
</script>

<template>
  <v-card class="ma-4">
    <v-toolbar color="primary" class="mb-4">
      <v-toolbar-title>
        Учетные записи
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn
        icon
        @click="entriesStore.addElement()"
      >
        <v-icon alt="Добавить">mdi-plus</v-icon>
      </v-btn>
    </v-toolbar>

    <v-alert
      type="info"
      variant="tonal"
      class="mb-8 mx-4"
    >
      Для указания нескольких меток - используйте разделитель <b>;</b>
    </v-alert>

    <v-divider :thickness="2"></v-divider>

    <v-data-table
        :headers="headers"
        :items="list"
        :items-length="list?.length"
        @update:current-items="entriesStore.saveToStorage"
      >
      <template v-slot:item.tags="{ item }">
        <v-textarea
          v-model="item.tags"
          :rules=[validationRules.maxLength(50)]
          no-resize
          rows="2"
          variant="outlined"
          class="mt-6"
          @update:focused="computeTags(item.id)"
        >
        </v-textarea>
      </template>
      
      <template v-slot:item.type="{ item }">
        <v-select
          v-model="item.type"
          :items="optionsType"
          :rules=[validationRules.required]
          variant="outlined"
          min-width="160"
          class="mt-6"
        >
        </v-select>
      </template>
      
      <template v-slot:item.login="{ item }">
        <v-text-field
          v-model="item.login"
          :rules=[validationRules.maxLength(100)]
          variant="outlined"
          min-width="160"
          class="mt-6"
        >
        </v-text-field>
      </template>
      
      <template v-slot:item.pass="{ item }">
        <v-text-field
          v-if="isNeedPass(item)"
          v-model="item.pass"
          :rules=[validationRules.required]
          type="password"
          variant="outlined"
          min-width="160"
          class="mt-6"
        >
        </v-text-field>
      </template>
      

      <template v-slot:item.actions="{ item }">
        <v-icon
          @click="entriesStore.removeElement(item.id)"
        >
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>

<style>
  .v-data-table tr th {
    font-size: 24px !important;
  }
</style>