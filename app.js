// Reference Data types
// When we "reference" Reference types (copy them, use them) it will point back to the original
// When we "reference" Primitive types, they create new data of the same value.

// ANCHOR Arrays store data by position (index)
// also called (lists, set*)

let arrNums = [1, 2, 3, 4, 5, 6]
let arrStrings = ['Mick', 'Jeremy', 'Jake']
let mixedArr = [10, 'Oslo', true, [4, 5, 6]] // mixed type arrays are a bad practice and should be avoided


// ANCHOR Objects store data by KEY : VALUE pairs
// (Dictionaries, maps*)

let instructor = {
  ownedCrocs: 10, name: 'Jake', favoriteFood: 'Pizza', isRad: true, preferredEmojis: ['🤠', '🦧', '🧛‍♀️'], greeting: function () {
    console.log('Howdy');
  }
}

let spiritGuide = { ownedCrocs: 0, name: 'Jeremy', favoriteFood: 'Steak', isRad: true, preferredEmojis: ['🦀', '🦙', '🌶️'] }

let staff = [instructor, spiritGuide]


const menu = [
  {
    name: "Caramel Frappe",
    price: 10.99,
    quantity: 0
  },
  {
    name: "Coconut Mocha",
    price: 12.74,
    quantity: 0
  },
  {
    name: "OSBWHBW",
    price: .90,
    quantity: 0
  },
  {
    name: "Smoldering CaoCao Drink",
    price: 8.53,
    quantity: 0
  }
]

function buyFrappe() {
  menu[0].quantity += 1
  console.log('boughtFrappe', menu[0])
}

function addToOrder(drinkIndex) {
  menu[drinkIndex].quantity += 1
  console.log('adding', menu[drinkIndex])
}


// increases quantity by checking the name value, on the object == to the argument passed from HTML
function addToOrderByName(drinkName) {
  for (let i = 0; i < menu.length; i++) {
    // console.log(menu[i])
    if (drinkName == menu[i].name) {
      menu[i].quantity += 1
      console.log('➕☕', menu[i]);
    }
  }
  // Changing data? don't forget to draw the data
  drawOrder()
}


function drawOrder() {
  // console.log(`- ${menu[0].name} x${menu[0].quantity} $${menu[0].price * menu[0].quantity}`);
  const orderListElm = document.getElementById('order-list')
  const totalElm = document.getElementById('order-total')
  let orderContent = '' // order content resets each time the the function is called
  for (let i = 0; i < menu.length; i++) {
    const item = menu[i]
    // console.log(`- ${item.name} x${item.quantity} $${item.price * item.quantity}`);
    if (item.quantity > 0) {
      // We add all the content up
      orderContent += `<p class="mb-1 fw-bold"><i class="mdi mdi-coffee"></i> ${item.name} x${item.quantity} $${(item.price * item.quantity).toFixed(2)}</p>`
    }
  }
  console.log(orderContent);
  // then we replace the content on the page with our "added up content"
  orderListElm.innerHTML = orderContent
  const orderTotal = getOrderTotal() // runs the function, and the "return" value from getOrderTotal is then saved in orderTotal
  totalElm.innerText = `$${orderTotal.toFixed(2)}` // toFixed fixes the number of digits after the decimal point
}

function getOrderTotal() {

  let total = 0
  for (let i = 0; i < menu.length; i++) {
    const item = menu[i]
    console.log("💵", item.price * item.quantity);
    total += item.price * item.quantity
  }
  console.log('💰', total);
  return total // return passes data OUT of a function
}

function clearCart() {
  window.prompt("please enter your credit card number")
  for (let i = 0; i < menu.length; i++) {
    const item = menu[i]
    item.quantity = 0
  }
  drawOrder()
}