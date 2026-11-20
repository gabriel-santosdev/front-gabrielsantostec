import { computed } from 'vue'
import { getContent } from '~/data/portfolio'

export function usePortfolio() {
  const { locale } = useI18n()
  return computed(() => getContent(locale.value))
}
