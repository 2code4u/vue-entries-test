export type EntriesList = Array<EntriesItem>

export interface EntriesItem {
  id: string,
  tags: string,
  tagsFormated: Array<{text: string}>,
  type: string,
  login: string,
  pass?: string | null
}