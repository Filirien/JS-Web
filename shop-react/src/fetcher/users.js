export async function login(user){
    let res;
    await fetch('http://localhost:1337/api/users/login',{
        method: 'POST',
        body: JSON.stringify(user),
        headers:{
            'Content-Type': 'application/json'
        }
    }).then(res=>res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
        res = response;
      if (typeof response === 'object') {
        setStorage(response);
      }
    })
    return res
}

export async function register (user) {
  let res;
  await fetch('http://localhost:1337/api/users/register', {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
      res = response;
      if (typeof response === 'object' && response.hasOwnProperty('_id')) {
        setStorage(response);
      }
    })
    return res;
}

export function logout () {
  emptyStorage();
}

export function update (user) {
  fetch('http://localhost:1337/api/users', {
    method: 'PUT',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then();
}

function setStorage (user) {
  localStorage.setItem('user', JSON.stringify(user));
}

function emptyStorage () {
  localStorage.clear();
}
