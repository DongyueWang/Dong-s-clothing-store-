basket = getLocalData();
let shop = document.querySelector('#shop');
let generateShop = () => {
    return (shop.innerHTML =
        shopItemsData.map
            (
                (item) => {
                    let { id, name, price, desc, img } = item;
                    let search = basket.find(x => x.id === id) || [];
                    return `<div id=product-id-${id} class="item">
         <img width="220" src=${img} alt="">
         <div class="details">
             <h3>${name}</h3>
             <p>${desc}</p>
             <div class="price-quantity">
                 <h2>$ ${price}</h2>
                 <div class="buttons">
                     <i onclick ="decrement(${id})" class ="bi bi-dash-lg"></i>
                     <div id=${id} class="quantity">${search && search.item ? search.item : 0}</div>
                     <i onclick ="increment(${id})"  class="bi bi-plus-lg"></i>
                 </div>
             </div>
         </div>
     </div>
     `}).join(""));
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
    localStorage.setItem('data', JSON.stringify(basket))
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

    localStorage.setItem('data', JSON.stringify(basket))
    basket = basket.filter(x => x.item > 0)

    //console.log(basket);
    update(item.id);
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

calculation();
generateShop();




