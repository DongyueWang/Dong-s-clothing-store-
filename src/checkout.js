let productlist = document.querySelector('#productlist');
let summary = document.querySelector('.summary');
basket = getLocalData();
const generateItemList = () => {
    if (basket && basket.length) {
        const tableTitle = `
        <div class=table-title>
                <div class="product-img-title"></div>
                <div class="product-name-title">Product Name</div>
                <div class="product-price-title">Price</div>
                <div class="product-quantity-title">Quantity</div>
                <div class="product-subtotal-title">Subtotal</div>
        </div>`;
        const tableContent = basket.map(
            x => {
                let { id, item } = x;
                let { img, name, price } = shopItemsData.find(x => x.id === id) || [];
                return `
                <div class=table-row>
                <div class="product-img"><img width="50" src=${img} alt="" /> </div>
                <div class="product-name">${name}</div>
                <div class="product-price">$ ${price}</div>
                <div class="product-quantity">${item}</div>
                <div class="product-subtotal">$ ${item * price}</div>
                </div>
                `
            }).join('');

        productlist.innerHTML = `${tableTitle}${tableContent}`;
    }
    else
        return '';
}
generateSummary = () => {
    const amount = getAmountValue();
    summary.innerHTML = `
<p class=HT>HT</p>
<p class=HT-value>$ ${amount * 1.00}</p>
<p class=Tax>Tax</p>
<p class=Tax-value>5.00%</p>
<p class=TTC>TTC</p>
<p class=TTC-value>$ ${amount * 0.05 + amount}</p>
<p class=cart-credits>Carts</p>
<p class=cart-credits-types><i class="bi bi-credit-card-2-front">	​💰​💳​\u{1F4B3}</i></p>
`
}

generateItemList();
generateSummary();