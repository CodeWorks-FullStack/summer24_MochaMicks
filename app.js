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

// Creating this menu with const, makes sure that we never accidentally make not an array
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

// Simple function with very limited functionality (Great starting point)
function buyFrappe() {
  menu[0].quantity += 1
  console.log('boughtFrappe', menu[0])
}

// Function with a parameter, takes in a drink index (position in the menu), this allows the function to be re-used for each drink. however indexes can be tricky to remember
function addToOrder(drinkIndex) {
  menu[drinkIndex].quantity += 1
  console.log('adding', menu[drinkIndex])
}

// Better Function, takes in a drink name instead of an index, using names make it more readable, and since it's going off names, the order of the menu could change and our function would still work with no changes.
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

// Loop over the array of items in the menu, adding strings together to create a little chunk of HTML that we add to our DOM (index.html)
function drawOrder() {
  // console.log(`- ${menu[0].name} x${menu[0].quantity} $${menu[0].price * menu[0].quantity}`);
  const orderListElm = document.getElementById('order-list')
  const totalElm = document.getElementById('order-total')
  let orderContent = '' // orderContent resets each time the the function is called
  for (let i = 0; i < menu.length; i++) {
    const item = menu[i]
    // console.log(`- ${item.name} x${item.quantity} $${item.price * item.quantity}`);
    if (item.quantity > 0) {
      // We add all the strings up into orderContent
      orderContent += `<p class="mb-1 fw-bold"><i class="mdi mdi-coffee"></i> ${item.name} x${item.quantity} $${(item.price * item.quantity).toFixed(2)}</p>`
    }
  }
  console.log(orderContent);
  // then we replace the content on the page with our "added up content"
  orderListElm.innerHTML = orderContent
  const orderTotal = getOrderTotal() // runs the getOrderTotal function, and the "return" value is then saved in orderTotal
  // 💭 const orderTotal = 10.75 (10.75 being the returned result)
  totalElm.innerText = `$${orderTotal.toFixed(2)}` // toFixed fixes the number of digits after the decimal point
}

// This function works in a very similar manner to draw order. It starts with a placeholder variable, we loop adding to the place holder.
function getOrderTotal() {
  let total = 0 // placeholder variable
  for (let i = 0; i < menu.length; i++) { // loop
    const item = menu[i] // "alias" to make our code more readable. reading item is better than menu[i]
    console.log("💵", item.price * item.quantity);
    total += item.price * item.quantity // add to placeholder
  }
  console.log('💰', total);
  return total // return passes data OUT of a function, back to wherever it was called
}

// loop over all the items on the menu and set their quantity to 0
function clearCart() {
  window.prompt("please enter your credit card number") // unessicary prompt for fun 
  for (let i = 0; i < menu.length; i++) {
    const item = menu[i]
    item.quantity = 0
  }
  drawOrder()
}