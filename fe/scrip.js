let productList=[];
let carrito = [];
let total = 0;

function add(productId, price){
    const product= productList.find(p => p.id === productId);
    product.stock--;
    console.log(productId, price);
    carrito.push(productId);
    total = total + price;
    document.getElementById("checkout").innerHTML = `Pagar $${total}`
    displayProducts();
}
async function pay(){
    try{
       const productList = await (await fetch("/api/pay", {
           method: "post",
           body: JSON.stringify(carrito),
           headers: {
               "Content-Type": "application/json"
           }
       })).json();
    }
    catch{
        window.alert("Pago Exitoso");
    }
     carrito = [];
     total = 0;
     await fetchProducts();
     document.getElementById("checkout").innerHTML = `Pagar $${total}`
    // 
}
//-----
function displayProducts(){
    let productsHTML ='';
    productList.forEach(p => {
      let buttonHTML  = `<button class="button-add" onclick="add(${p.id}, ${p.price})">Agregar</button>`;
       
      if (p.stock <= 0){
      buttonHTML  = `<button disabled class="button-add disabled" onclick="add(${p.id}, ${p.price})">Sin Stock</button>`;
      } 
      
      productsHTML +=
    `<div class="products-container">
        <h2>${p.name}</h2>
        <img src="${p.Image}"/>
        <h3>$${p.price}</h3>
        ${buttonHTML}
    </div>`
    });
    document.getElementById('page-content').innerHTML= productsHTML;
}

async function fetchProducts(){
    productList= await (await fetch("/api/products")).json();
    displayProducts();
}

window.onload= async() => {
    await fetchProducts();
    
   
}