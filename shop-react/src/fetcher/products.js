export async function getProductsByCategoryName(categoryName) {
    let products = [];
    await fetch('http://localhost:1337/api/products/category=' + categoryName)
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            products = response;
        });
    return products;
}

export async function getProductById(productId) {
    let product = {};
    await fetch('http://localhost:1337/api/products/product=' + productId)
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            product = response;
        });
    return product;
}

export async function getNewProducts() {
    let products = [];
    await fetch('http://localhost:1337/api/products/new')
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            products = response;
        });
    return products;
}

export async function getProductsByArray(array) {
    let products = [];
    await fetch('http://localhost:1337/api/products/array=' + array)
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            products = response;
        });
    return products;
}

export async function create(product) {
    await fetch('http://localhost:1337/api/products', {
        method: 'POST',
        body: JSON.stringify(product),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then();
}

export async function update(product) {
    await fetch('http://localhost:1337/api/products', {
        method: 'PUT',
        body: JSON.stringify(product),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then();
}