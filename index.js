import { menuArray } from "./data.js"

const checkoutSection = document.getElementById("checkout-section")

let orderArray = []

//payment modal section
const paymentModalSection = document.getElementById("payment-modal-section")

document.getElementById("modal-close-btn").addEventListener("click", function(){
    closeModal()
})

//pay-btn
paymentModalSection.addEventListener("submit", function(e){
    e.preventDefault()
    closeModal()
    
    checkoutSection.style.display = "none"

    const customerName = document.getElementById("customer-name")
    const customerNameData = document.getElementById("customer-name-data")
    
    customerNameData.textContent = customerName.value
    document.getElementById("thank-you-note").classList.remove("hidden")
})

//close modal
function closeModal() {
    paymentModalSection.style.display = "none"
}

//----------------------------------

//listen for clicks
document.addEventListener("click", function(e){
    if(e.target.dataset.add) {
        addItem(e.target.dataset.add)
        checkoutSection.style.display = "flex"
    }
    else if(e.target.dataset.remove) {
        removeItemFromOrder(e.target.dataset.remove)
    }
    else if(e.target === document.getElementById("complete-order-btn")){
        document.getElementById("payment-modal-section").style.display = "flex"       
    }
})

//remove-order-btn click
function removeItemFromOrder(menuId){
    const targetRemoveObj = orderArray.filter(function(menu){
        return menu.id = menuId
    })[0]
    
    orderArray.splice(orderArray.indexOf(targetRemoveObj),1)
    renderOrderSummary(menuId)
    
    if (orderArray.length === 0) {
        checkoutSection.style.display = "none"
    }
}
    
//add-btn click
function addItem(menuId){
    const targetMenuObj = menuArray.filter(function(menu){
        return menu.id == menuId
    })[0]
    
    orderArray.push(targetMenuObj)
    renderOrderSummary(menuId)
}

function renderOrderSummary(menuId){
    let orderHtml = ``
    
    orderArray.forEach(function(menu){
        orderHtml +=`
            <div class="order-item">
                <h2>${menu.name}</h2>
                <button class="remove-order-btn" data-remove="${menu.id}">remove</button>
                <h4 class="align-right">$${menu.price}</h4>
            </div> 
        `
    })
    document.getElementById("order-list").innerHTML = orderHtml
    getTotalPrice()
}
  
//get total price
function getTotalPrice(){
    let totalPrice = 0
    
    orderArray.forEach(function(menu){
        totalPrice += menu.price        
    })
    document.getElementById("total-price").textContent = "$" + totalPrice
}   


//get menu
function getMenuHtml(){
    let getMenuHtml = ``
    
    menuArray.forEach(function(menu){
        getMenuHtml += `
            <div class="menu-item-container">
                <div class="item-image">
                    <p class="emoji">${menu.emoji}</p>
                </div>
                <div class="item-detail">
                    <h2 class="name">${menu.name}</h2>
                    <p class="ingredients">${menu.ingredients}</p>
                    <h4 class="price">$${menu.price}</h4>
                </div>
                <button class="add-btn" id="add-btn" data-add="${menu.id}">+</button>
            </div>
        `
    })
    return getMenuHtml
}

//render menu
function renderMenu(){
    document.getElementById("menu").innerHTML = getMenuHtml()
}

renderMenu()