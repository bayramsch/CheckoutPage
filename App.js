const taxRate = 0.18;
const shippingPrice = 15.0

window.addEventListener("load",()=>{
    localStorage.setItem("taxRate", taxRate);
    localStorage.setItem("shippingPrice", shippingPrice)
})




let containerDiv = document.querySelector(".container");
containerDiv.addEventListener("click",(e)=>{

    let productQuantityP = e.target.parentElement.parentElement.querySelector(".product__quantity");
    //console.log(productQuantityP);
    //! minus button
  
    if(e.target.classList.contains("fa-minus") || e.target == productQuantityP.parentElement.firstElementChild){
        if(productQuantityP.innerText>1){
            productQuantityP.innerText--;

            ProductTotalPreis(productQuantityP);
        }
        else {
            if (confirm("The product will be removed")){
                productQuantityP.parentElement.parentElement.parentElement.remove();
                GrandTotal();
            }
            
        }
        
        //console.log("minusBtn");
    }
    //! plus

    else if(e.target.className == "fa fa-plus" || e.target == productQuantityP.parentElement.lastElementChild) {
        productQuantityP.innerText++;
        ProductTotalPreis(productQuantityP);
        
        //console.log("plusBtn");
    }

    //! remove button

    else if(e.target.classList.contains("remove-product")){
        
        if (confirm("The product will be removed")){
            productQuantityP.parentElement.parentElement.parentElement.remove();
            GrandTotal();
        }
        
        GrandTotal();
    }
    


})

const ProductTotalPreis = (productQuantityP) => {
    //console.log(productQuantityP.innerText);
    
    let productPreis = productQuantityP.parentElement.parentElement.querySelector(".strong");
    
    
    let totalPreisDiv = productQuantityP.parentElement.parentElement.querySelector(".total-product-preis");
    

    totalPreisDiv.innerText = (productQuantityP.innerText * productPreis.innerText).toFixed(2);
    

    GrandTotal();
}

const GrandTotal = () => {
    let productTotalPriceDivs = document.querySelectorAll(".total-product-preis")
    let subtotal = 0;
    productTotalPriceDivs.forEach(eachProduct=>{
        
        subtotal  += parseFloat(eachProduct.innerText)
        
    })
    console.log(subtotal);

    let taxPrice = (subtotal * localStorage.getItem("taxRate")).toFixed(2);
    let shipping = (subtotal>0 ? parseFloat(localStorage.getItem("shippingPrice")) : 0).toFixed(2);
    let grandtotal = (parseFloat(subtotal) + parseFloat(taxPrice) + parseFloat(shipping)).toFixed(2);
    
    
    document.querySelector(".subtotal").innerHTML =  subtotal.toFixed(2);
    document.querySelector(".tax").innerHTML = taxPrice;
    document.querySelector(".shipping").innerHTML = shipping ;
    document.querySelector(".total").innerHTML = grandtotal;

    /* document.querySelector(".subtotal").innerHTML =  subtotal; 
    document.querySelector(".tax").innerHTML = taxPrice;
    document.querySelector(".shipping").innerHTML = shipping ;
    document.querySelector(".total").innerHTML = grandtotal; */

}