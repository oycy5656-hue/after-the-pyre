<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: { type: [String, Number], default: '' },
  edit: { type: Boolean, default: false },
  multiline: { type: Boolean, default: false },
  placeholder: { type: String, default: '' },
  type: { type: String, default: 'text' }
})
const emit = defineEmits(['update:modelValue'])

const value = computed({
  get: () => props.modelValue ?? '',
  set: (v) => emit('update:modelValue', v)
})
</script>

<template>
  <textarea
    v-if="edit && multiline"
    v-model="value"
    class="ed-input"
    rows="3"
    :placeholder="placeholder"
  />
  <input v-else-if="edit" v-model="value" class="ed-input" :type="type" :placeholder="placeholder" />
  <slot v-else>{{ modelValue }}</slot>
</template>

<style scoped>
.ed-input {
  width: 100%;
  box-sizing: border-box;
  padding: 6px 9px;
  font: inherit;
  font-size: 0.95em;
  line-height: 1.6;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg);
  border: 1px dashed color-mix(in srgb, var(--vp-c-brand-1) 55%, var(--vp-c-divider));
  border-radius: 6px;
  outline: none;
  resize: vertical;
}

.ed-input:focus {
  border-style: solid;
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 3px var(--vp-c-brand-soft);
}
</style>
