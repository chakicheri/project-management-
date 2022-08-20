// 1  get total
// 2  create product
// 3  save to localstorage
// 4  clear inputs
// 5  read
// 6  count
// 7  delete
// 8  update
// 9  searsh
// 10 clean data
const title = document.getElementById('title')
const price = document.getElementById('price')
const taxes = document.getElementById('taxes')
const ads = document.getElementById('ads')
const discount = document.getElementById('disc')
const total = document.getElementById('total')
const count = document.getElementById('count')
const category = document.getElementById('category')
const submit = document.getElementById('submit')
let mood = 'create'
let tmp

//1-get total

function getTotal() {
  if (price.value != '') {
    let result = +price.value + +taxes.value + +ads.value - +discount.value
    total.innerHTML = result
    total.style.background = '#040'
  } else {
    total.innerHTML = ''
    total.style.background = '#a00d02'
  }
}

// 2  create product  and  save it to localstorage

let dataPro
if (localStorage.product != null) {
  dataPro = JSON.parse(localStorage.product)
} else {
  dataPro = []
}

submit.onclick = function () {
  let newPro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  }

  if (title.value != '' 
  && price.value != '' ) {
    if (mood === 'create') {
      if (newPro.count > 1) {
        //count
        for (let i = 0; i < newPro.count; i++) {
          dataPro.push(newPro)
        }
      } else {
        dataPro.push(newPro)
      }
    } else {
      dataPro[tmp] = newPro
      mood = 'create'
      submit.innerHTML = 'Create'
      count.style.display = 'block'
    }
    clearInput()
  }

  //save local storage
  localStorage.setItem('product', JSON.stringify(dataPro))

  showData()
  getTotal()
}

// 4  clear inputs
let clearInput = () => {
  title.value = ''
  price.value = ''
  taxes.value = ''
  ads.value = ''
  discount.value = ''
  count.value = ''
  category.value = ''
  total.innerHTML = ''
  getTotal()
}
// 5  read
function showData() {
  let table = ''
  for (let i = 0; i < dataPro.length; i++) {
    table += `
   <tr>
      <td>${i+1}</td>
      <td>${dataPro[i].title}</td>
      <td>${dataPro[i].price}</td>
      <td>${dataPro[i].taxes}</td>
      <td>${dataPro[i].ads}</td>
      <td>${dataPro[i].discount}</td>
      <td>${dataPro[i].total}</td>
      <td>${dataPro[i].category}</td>
      <td><button onclick="updateData(${i})" id="update">Update</button></td>
      <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>      
     </tr>`
    document.getElementById('tbody').innerHTML = table
    let btnDelete = document.getElementById('deleteAll')
    if (dataPro.length > 0) {
      btnDelete.innerHTML = `
      <button onclick="deleteAll()">Delete All(${dataPro.length}) </button>`
    } else {
      btnDelete.innerHTML = ''
    }
  }
}

// 7  delete

function deleteData(i) {
  dataPro.splice(i, 1)
  localStorage.product = JSON.stringify(dataPro)
  showData()
}
function deleteAll() {
  localStorage.clear()
  dataPro.splice(0)
  showData()
}

//8 update
function updateData(i) {
  title.value = dataPro[i].title
  price.value = dataPro[i].price
  taxes.value = dataPro[i].taxes
  ads.value = dataPro[i].ads
  discount.value = dataPro[i].discount
  count.style.display = 'none'
  category.value = dataPro[i].category
  submit.innerHTML = 'Update'
  mood = 'update'
  tmp = i
  scroll({
    top: 0,
    behavior: 'smooth',
  })
  getTotal()
}

// 9 Search
// a - search by (title or category)
let searchMood = 'title'
function getSearchMood(id) {
  let search = document.getElementById('search')
  if (id == 'searchTitle') {
    searchMood = 'title'
  } else {
    searchMood = 'category'
  }
  search.placeholder = 'Search By ' + searchMood
  search.focus()
  search.value = ''
  showData()
}
//b- search function
function searchData(value) {
  let table = ''
  if (searchMood == 'title') {
    for (let i = 0; i < dataPro.length; i++) {
      if (dataPro[i].title.includes(value.toLowerCase())) {
        table += `
   <tr>
      <td>${i}</td>
      <td>${dataPro[i].title}</td>
      <td>${dataPro[i].price}</td>
      <td>${dataPro[i].taxes}</td>
      <td>${dataPro[i].ads}</td>
      <td>${dataPro[i].discount}</td>
      <td>${dataPro[i].total}</td>
      <td>${dataPro[i].category}</td>
      <td><button onclick="updateData(${i})" id="update">Update</button></td>
      <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>      
     </tr>`
      }
    }
  } else {
    for (let i = 0; i < dataPro.length; i++) {
      if (dataPro[i].category.includes(value.toLowerCase())) {
        table += `
   <tr>
      <td>${i}</td>
      <td>${dataPro[i].title}</td> 
      <td>${dataPro[i].price}</td>
      <td>${dataPro[i].taxes}</td>
      <td>${dataPro[i].ads}</td>
      <td>${dataPro[i].discount}</td>
      <td>${dataPro[i].total}</td>
      <td>${dataPro[i].category}</td>
      <td><button onclick="updateData(${i})" id="update">Update</button></td>
      <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>      
     </tr>`
      }
    }
  }
  document.getElementById('tbody').innerHTML = table
}
showData()
