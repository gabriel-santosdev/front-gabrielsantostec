import { computed } from 'vue'
import { getContent } from '~/data/portfolio'

/** Conteúdo do portfólio (experiência, stack, projetos, serviços) no idioma atual. */
export function usePortfolio() {
  const { locale } = useI18n()
  return computed(() => getContent(locale.value))
}
