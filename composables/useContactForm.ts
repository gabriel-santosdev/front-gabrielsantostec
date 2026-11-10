import { ref } from 'vue'

export function useContactForm(endpoint: string) {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const success = ref(false)

  async function sendContactForm(data: Record<string, string>) {
    loading.value = true
    error.value = null
    success.value = false

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        throw new Error('Erro ao enviar o formulário.')
      }

      success.value = true
    } catch (err: any) {
      error.value = err.message || 'Erro desconhecido'
    } finally {
      loading.value = false
    }
  }

  return {
    sendContactForm,
    loading,
    error,
    success
  }
}