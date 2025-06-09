export const useGithubApi = async (username: string) => {
    const { data, error } = await useFetch(`https://api.github.com/users/${username}/repos`);
    return { data, error }
  }  