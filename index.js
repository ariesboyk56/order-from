const items = [
  { name: 'Pizza 001', price: 6.9, quantity: 1 },
  { name: 'Pizza 002', price: 8.9, quantity: 1 },
  { name: 'Pizza 003', price: 9.9, quantity: 1 },
]
const Shipping = 2;

function add() {
  items.push({
    name: `Pizza ${Math.random().toFixed(3)}`,
    quantity: 1,
    price: Math.random() * 10
  })
  render();
}
function remove(index) {
  items.splice(index, 1);
  render();
}
function updateQuantity(index, quantity) {
  if (quantity < 1) {
    return
  }

  items[index].quantity = quantity;
  render();
}

function render() {
  let subTotal = 0;
  items.forEach(item => {
    subTotal += item.quantity * item.price
  });
  const total = subTotal + Shipping;
  const html = items.map(item => `
    <li class="order-item">
        <span class="item-name">${item.name}</span>

        <span class="item-quantity">
          <button class="dec">-</button>
          <input type="number" class="quantity" value='${item.quantity}'>
          <button class="inc">+</button>
        </span>

        <span class="item-price">
          <span>$${(item.quantity * item.price).toFixed(2)}</span>
          <button class="btn-delete">X</button>
        </span>

      </li>
  `).join('');
  $('.order-items').innerHTML = html;

  const deletebtn = [...$$('.btn-delete')];
  const decbtn = [...$$('.dec')];
  const incbtn = [...$$('.inc')];

  for (let i = 0; i < deletebtn.length; i++) {
    decbtn[i].addEventListener('click', () => {
      updateQuantity(i, items[i].quantity - 1);
    })
    incbtn[i].addEventListener('click', () => {
      updateQuantity(i, items[i].quantity + 1);
    })
    deletebtn[i].addEventListener('click', () => {
      remove(i);
    })
  }

  $('#sub-total').innerText = `$${subTotal.toFixed(2)}`;
  $('#shipping').innerText = `$${Shipping}`;
  $('#total').innerText = `$${total.toFixed(2)}`;
}

$('#btn-add').addEventListener('click', () => {
  add();
})
render();