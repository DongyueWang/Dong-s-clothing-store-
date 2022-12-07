let label = document.querySelector('#label');
let shoppingCart = document.querySelector('#shopping-cart');

let generateCartItems = () => {
    if (basket && basket.length) {
        shoppingCart.innerHTML = basket.map(
            x => {
                let { id, item } = x;
                let { img, name, price } = shopItemsData.find(x => x.id === id) || []
                return `
                <div class="cart-item">
                    <img width="100" src=${img} alt="" />
                    <div class="details">
                        <div class="title-price-x">
                            <h4 class="title-price">
                                <p>${name}</p>
                                <p class="cart-item-price">$ ${price}</p>
                            </h4>
                            <i onclick ="removeItem(${id})" class="bi bi-x-lg"></i>
                        </div>
                        <div class="buttons">
                            <i onclick ="decrement(${id})" class ="bi bi-dash-lg"></i>
                                <div id=${id} class="quantity">${item}</div>
                            <i onclick ="increment(${id})"  class="bi bi-plus-lg"></i>
                        </div>
                        <h3>$ ${item * price}</h3>
                    </div>
                </div>
                `;
            }

        ).join('');

    } else {
        shoppingCart.innerHTML = ``;
        label.innerHTML = `
        <h2>Cart is Empty</h2>
        <a href="index.html">
        <button class='home-btn'>Back to home</button>
        </a>
        `;
    }
}

let increment = (id_item) => {
    basket = getLocalData();
    let item = id_item;
    let search = basket.find(x => x.id === item.id)

    if (search === undefined) {
        basket.push(
            {
                id: item.id,
                item: 1
            }
        );
    }
    else {
        search.item++;
    }
    search
    //console.log(basket);
    update(item.id);
    refresh()
}

let decrement = (id_item) => {
    basket = getLocalData();
    let item = id_item;
    let search = basket.find(x => x.id === item.id)

    if (search === undefined || search.item === 0) {

        return;
    }
    else {
        if (search.item > 0)
            search.item--;
    }

    update(item.id);
    basket = basket.filter(x => x.item > 0)
    refresh()
}

let update = (id) => {
    let search = basket.find((x) => x.id === id);
    console.log(search);
    if (search) {
        document.querySelector(`#${id}`).innerHTML = search.item;
    } else {
        document.querySelector(`#${id}`).innerHTML = 0;
    }
    calculation();
}

let removeItem = (id) => {
    let selectedItem = id;
    basket = basket.filter(x => x.id !== selectedItem.id)
    refresh()
}

let ClearCart = () => {
    basket = []
    refresh();
}

let Checkout = () => {
    console.log("Checkout");
}

let totalAmount = () => {
    if (basket.length) {
        let amount = getAmountValue();
        updateAmountField(amount);
    } else {
        return;
    }
}

let updateAmountField = (amount) => {
    label.innerHTML = `
        <h2>Total Bill :  $ ${amount}</h2>
       
        <a href="checkout.html">
        <button class="checkout">Checkout</button>
       </a>

        <button onclick="ClearCart()" class="removeAll">Clear Cart</button>
        `
}

function load() {
    calculation();
    generateCartItems();
    totalAmount();
}

function refresh() {
    load()
    localStorage.setItem('data', JSON.stringify(basket));
}

load()



