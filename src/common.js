let getLocalData = () => {
    return (JSON.parse(localStorage.getItem('data')) || []);
}

let basket = getLocalData();

let calculation = () => {
    const total = basket.reduce((x, y) => x + y.item, 0)
    document.querySelector(`.cartAmount`).innerHTML = total;
}

let getAmountValue = () => {
    if (basket.length) {
        return (amount = basket.reduce((accu, cur) => {
            return accu + cur.item *
                (shopItemsData.find(y => y.id === cur.id).price)
        }, 0.00))

    } else {
        return 0;
    }
}
