const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'bde6df33f1mshc88137c1d9a1b57p1991aejsnd19574413f42',
		'X-RapidAPI-Host': 'books39.p.rapidapi.com'
	}
};


let res = await fetch('https://books39.p.rapidapi.com/CZFA4F/books', options)
let data = await res.json();



let shoppingCartArray = [];
let total = 0;

let productsArray = data.slice(1, 5);

let productContainer = document.querySelector('.shop-items');
let cartContainer = document.querySelector('.cart-items');

productsArray.forEach(product => {
    productContainer.innerHTML += `
    <div class="shop-item" id="${product.id}">
        <span class="shop-item-title">${product.TITLE}</span>
        <img class="shop-item-image" src="./libro.png">
        <p class="shop-item-author">${product.AUTHOR}</p>
        <div class="shop-item-details">
            <span class="shop-item-price">$${product.YEAR}</span>
            <button class="btn btn-primary shop-item-button" type="button">ADD TO CART</button>
        </div>
    </div>`
});

let addBtns = document.querySelectorAll('.shop-item-button');
addBtns = [...addBtns];

addBtns.forEach(btn=>{
    btn.addEventListener('click', event=>{
        let actualId = parseInt(event.target.parentNode.parentNode.id);
        let actualProduct = productsArray.find(item => item.id == actualId);
        console.log(actualProduct)
        if(actualProduct.quantity === undefined){
            actualProduct.quantity = 1  ;
        }

        

        let existe = false;
        shoppingCartArray.forEach(libro =>{
            if (actualId == libro.id){
                existe = true
            }
        })
        if(existe){
            actualProduct.quantity++
        }else{
            shoppingCartArray.push(actualProduct)
        }
        drawItems();

        getTotal();

        putAEventListenerInNumbericInput();

        removeItems();
    })
 
});

function getTotal(){
    let sumTotal
    let total = shoppingCartArray.reduce((sum, item)=>{
        sumTotal = sum + item.quantity*item.YEAR;
        return sumTotal;
    } , 0);
    totalElement.innerText = `$${total}`
}

function drawItems(){
    cartContainer.innerHTML = '';

        shoppingCartArray.forEach(item => {
            cartContainer.innerHTML += `
            <div class="cart-row">
                <div class="cart-item cart-column">
                    <img class="cart-item-image" src="./libro.png" width="100" height="100">
                    <span class="cart-item-title">${item.TITLE}</span>
                </div>
                <span class="cart-price cart-column">$${item.YEAR}</span>
                <div class="cart-quantity cart-column">
                    <input class="cart-quantity-input" min="1" type="number" value="${item.quantity}">
                    <button class="btn btn-danger" type="button">REMOVE</button>
                </div>
            </div>`
        });
        removeItems();
}

let totalElement = document.querySelector('.cart-total-title');



function putAEventListenerInNumbericInput(){
    let inputNumber = document.querySelectorAll('.cart-quantity-input')
    inputNumber = [...inputNumber]
    inputNumber.forEach(item=>{
        item.addEventListener('click', event=>{
            let actualBookTitle = event.target.parentElement.parentElement.childNodes[1].innerText;
            let actualBookQuantity = parseInt(event.target.value);

            let actualBookObeject = shoppingCartArray.find(item =>item.TITLE == actualBookTitle)


            actualBookObeject.quantity = actualBookQuantity;

            getTotal();
        });
    });
}

function removeItems(){
    let removeBtns = document.querySelectorAll('.btn-danger');
    removeBtns = [...removeBtns]
    removeBtns.forEach(btn=>{
        btn.addEventListener('click', event=>{
            let actualBookTitle = event.target.parentElement.parentElement.childNodes[1].innerText;
            let actualBookObeject = shoppingCartArray.find(item =>item.TITLE == actualBookTitle);

            shoppingCartArray = shoppingCartArray.filter(item => item != actualBookObeject)
            
            drawItems()
            getTotal()
            updateNumberOfItems();
    
            
        });
    });
    
}