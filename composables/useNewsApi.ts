export const useNewsApi = async () => {
    const config = useRuntimeConfig();
    const { data, error } = await useFetch('https://newsapi.org/v2/top-headlines', {
      params: {
        category: 'technology',
        language: 'en',
        pageSize: 4,
        country: 'us',
        apiKey: config.public.newsApiKey
      },
      server: true
    });
    return { data, error }
  }  