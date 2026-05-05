const products = [
{
id:1,
name:"Beach Tshirt",
price:999,
image:"https://assets.myntassets.com/h_1440,q_75,w_1080/v1/assets/images/33121078/2025/4/27/dbc61142-97f5-4a9f-99b3-2d17d82269691745752163798-StitchX-Men-Standard-Floral-Opaque-Printed-Beach-Shirt-47174-1.jpg"
},
{
id:2,
name:"RoundNeck Tshirt",
price:149,
image:"https://static.cilory.com/822781-thickbox_default/sky-blue-round-neck-full-sleeves-t-shirt-for-men.jpg.webp"
},
{
id:3,
name:"Casual Tshirt",
price:799,
image:"https://media.landmarkshops.in/cdn-cgi/image/h=730,w=540,q=85,fit=cover/max-new/1000013954146-Beige-BEIGE-1000013954146_03-2100.jpg"
},
{
id:4,
name:"Cotton Shirt",
price:299,
image:"https://www.creaturesofhabit.in/cdn/shop/files/FUJIFILM_X-T3096.jpg?v=1698163521"
},
{
id:5,
name:"Campus Shirt",
price:199,
image:"https://campussutra.com/cdn/shop/files/CSMSSRT7738_1_3b3a4a5e-5da6-48a2-9bb3-c4bfdbe43f3f.jpg?v=1731147468"
},
{
id:6,
name:"Pink Bow Top",
price:169,
image:"https://assets.myntassets.com/w_200,q_50,,dpr_3,fl_progressive,f_webp/assets/images/2025/NOVEMBER/22/QbijvVj1_43d8025aadae495ca5cae4f1a016d840.jpg"
},
{
id:7,
name:"Gym wear",
price:199,
image:"https://aestheticnation.co.in/cdn/shop/files/Full_Sleeve_Compression_T-Shirt_for_Men_Gym_Recovery_Gear.jpg?v=1752319212&width=1080"
},
{
id:8,
name:"Cord Set",
price:199,
image:"https://m.media-amazon.com/images/I/61ZLU+3DpAL._AC_UY350_.jpg"
},
{
id:9,
name:"Denim Top",
price:199,
image:"https://media.landmarkshops.in/cdn-cgi/image/h=730,w=540,q=85,fit=cover/max-new/1000014786582-Blue-MIDBLUE-1000014786582_01-2100.jpg"
},
{
id:10,
name:"Woolen Tshirt",
price:199,
image:"https://cdn.shopify.com/s/files/1/0347/3225/files/Sweater2_grande.jpg?v=1545493289"
}
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* SHOW PRODUCTS */

function displayProducts(data){

let html = "";

if(data.length === 0){

html = `
<div class="not-found">
<h2>No Product Found 😔</h2>
<p>Try another search</p>
</div>
`;

document.getElementById("productList").innerHTML = html;
return;
}

function viewProduct(id){

let product = products.find(item => item.id === id);

alert(
"🛍 Product Name: " + product.name +
"\n💲 Price: $" + product.price +
"\n⭐ Premium Quality Product"
);

}

function goBackHome(){

document.getElementById("searchInput").value = "";

displayProducts(products);

window.scrollTo({
top:0,
behavior:"smooth"
});

}

data.forEach(item=>{

html += `
<div class="card">

<img src="${item.image}" alt="${item.name}">

<h3>${item.name}</h3>

<div class="price">$${item.price}</div>

<div class="btns">

<button class="view"
onclick="viewProduct(${item.id})">
View
</button>

<button class="add"
onclick="addToCart(${item.id})">
Add
</button>

</div>

</div>
`;

});

document.getElementById("productList").innerHTML = html;

}

displayProducts(products);

/* SEARCH */

function searchProduct(){

let value = document.getElementById("searchInput").value.trim()
.toLowerCase();

let filtered = products.filter(item =>
item.name.toLowerCase().includes(value)
);

displayProducts(filtered);

}

/* ADD TO CART */

function addToCart(id){

let product = products.find(item => item.id === id);

let existing = cart.find(item => item.id === id);

if(existing){
existing.qty++;
}else{
cart.push({...product,qty:1});
}

saveCart();
renderCart();

}

/* SAVE */

function saveCart(){
localStorage.setItem("cart",JSON.stringify(cart));
}

/* CART */

function renderCart(){

let html="";
let total=0;
let count=0;

cart.forEach(item=>{

total += item.price * item.qty;
count += item.qty;

html += `
<div class="cart-item">

<img src="${item.image}">

<div>
<h4>${item.name}</h4>
<p>$${item.price}</p>

<div class="qty">
<button onclick="changeQty(${item.id},-1)">-</button>
<span>${item.qty}</span>
<button onclick="changeQty(${item.id},1)">+</button>
</div>

<button class="remove" onclick="removeItem(${item.id})">Remove</button>

</div>
</div>
`;

});

document.getElementById("cartItems").innerHTML = html;
document.getElementById("totalPrice").innerText = total;
document.getElementById("cartCount").innerText = count;

}

function changeQty(id,val){

let item = cart.find(x => x.id === id);

item.qty += val;

if(item.qty <=0){
cart = cart.filter(x => x.id !== id);
}

saveCart();
renderCart();

}

function removeItem(id){

cart = cart.filter(x => x.id !== id);

saveCart();
renderCart();

}

/* CART OPEN */

function openCart(){
document.getElementById("cartPanel").classList.add("active");
}

function closeCart(){
document.getElementById("cartPanel").classList.remove("active");
}

renderCart();