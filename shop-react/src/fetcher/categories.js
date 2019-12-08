export async function allCategories () {
  let categories = [];
  await fetch('http://localhost:1337/api/categories')
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
      categories = response;
    })
  return categories;
}

export async function create (category) {
    let res;
    await fetch('http://localhost:1337/api/categories', {
      method: 'POST',
      body: JSON.stringify(category),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => {
        res = response;
        console.log(response);
      })
      return res
  }
  