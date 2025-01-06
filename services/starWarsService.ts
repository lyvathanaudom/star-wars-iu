// starWarsService.ts
export const fetchData = async (endpoint: string): Promise<any[]> => {
  try {
    const response = await fetch(`https://swapi.tech/api/${endpoint}/`);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${endpoint}`);
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    return [];
  }
};