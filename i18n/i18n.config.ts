export default defineI18nConfig(() => ({
  legacy: false,
  fallbackLocale: 'pt',
  // Alguns textos têm <strong> (renderizados com v-html, conteúdo nosso e estático)
  // e exemplos como "cat <arquivo>"; não são HTML vindo de usuários.
  warnHtmlMessage: false,
}))
