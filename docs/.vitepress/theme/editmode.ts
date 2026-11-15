import { ref } from 'vue'

const KEY = 'pyre.editmode'

const state = ref(false)
let loaded = false

export function editMode() {
  if (!loaded && typeof localStorage !== 'undefined') {
    state.value = localStorage.getItem(KEY) === '1'
    loaded = true
  }
  return state
}

export function toggleEditMode(force) {
  state.value = typeof force === 'boolean' ? force : !state.value
  if (typeof localStorage !== 'undefined') localStorage.setItem(KEY, state.value ? '1' : '0')
  return state.value
}
