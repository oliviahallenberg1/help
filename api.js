const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export function fetchRandomCocktail() {
    return fetch(`${apiUrl}random.php`)
    .then(response => {
      if (!response.ok) 
        throw new Error('Something went wrong!' + response.statusText);

      return response.json()
    })
};

export function fetchCocktailsByName(keyword) {
    return fetch(`${apiUrl}search.php?s=${keyword}`)
    .then(response => {
      if (!response.ok) 
        throw new Error('Something went wrong!' + response.statusText);

      return response.json()
    })
};

export function fetchCocktailById(id) {
  return fetch(`${apiUrl}lookup.php?i=${id}`)
  .then(response => {
    if (!response.ok) 
      throw new Error('Something went wrong!' + response.statusText);

    return response.json()
  })
}

export function fetchCocktailsByIngredient(ingredient) {
    return fetch(`${apiUrl}filter.php?i=${ingredient}`)
    .then(response => {
      if (!response.ok) 
        throw new Error('Something went wrong!' + response.statusText);

      return response.json()
    })
};

