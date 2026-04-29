const products = [
{
name:"Modern Sofa",
category:"Furniture",
price:"₹24,999",
image:"https://image.made-in-china.com/2f0j00cUekLTtRuugs/Italian-Sofa-Set-Designs-Sofas-for-Home-Nordic-Luxury-Modern-Sofa-Leather.webp"
},

{
name:"Wooden Chair",
category:"Furniture",
price:"₹8,999",
image:"https://i.pinimg.com/736x/73/f3/00/73f300a207ed5bf45cda100f23c73434.jpg"
},

{
name:"Wall Lamp",
category:"Lighting",
price:"₹3,499",
image:"https://www.homedecorcompany.in/cdn/shop/files/O1CN01Jc6fY121pAKEBTs5R__2212962877033-0-cib_1024x1024_2x_c3627c60-2bed-471a-81bf-fe910de0bb4f.jpg?v=1750455275"
},

{
name:"Coffee Table",
category:"Furniture",
price:"₹8,499",
image:"https://i.pinimg.com/236x/a6/15/fb/a615fb6797e03fd0bb358360a20a25eb.jpg"
},

{
name:"Decor Vase",
category:"Decor",
price:"₹2,199",
image:"https://image.made-in-china.com/202f0j00bfdkFiLRhHuD/Modern-Vases-for-Home-Decor-White-Boho-Vases-for-Bedroom-Dining-Table-Office-Farmhouse-Decorative-Vase-for-Decor.jpg"
},

{
name:"Pendant Light",
category:"Lighting",
price:"₹15,999",
image:"https://blissandbirch.co.in/cdn/shop/files/Modern-Hanging-Light-4_9bd85635-84f6-4b80-ac2c-5a771174fef9.webp?v=1743567515"
},

{
name:"Bookshelf",
category:"Furniture",
price:"₹5,499",
image:"https://cdn.shopify.com/s/files/1/0191/2234/files/A_Comprehensive_Guide_How_To_Choose_The_Perfect_Bookshelf_For_Your_Home_480x480.jpg?v=1686722242"
},

{
name:"Luxury Bed",
category:"Furniture",
price:"₹58,499",
image:"https://cdn.home-designing.com/wp-content/uploads/2018/10/luxury-bedroom-design-features-1024x1449.jpg"
},

{
name:"Crystal Light",
category:"Lighting",
price:"₹10,499",
image:"https://www.homedecorcompany.in/cdn/shop/files/S330cf7c7367c42d88393b2a07866b4c8j_jpg.webp?v=1750452341"
},

{
name:"Moon Mirror",
category:"Decor",
price:"₹9,099",
image:"https://www.bocadolobo.com/en/inspiration-and-ideas/wp-content/uploads/2016/05/Top-Luxury-Bathroom-Mirrors.png"
},

{
name:"Seater Swing",
category:"Furniture",
price:"₹7,499",
image:"https://i.pinimg.com/736x/34/fe/2b/34fe2b39c1ef5520328da0507d01ff6c.jpg"
},

{
name:"Luxury Rug",
category:"Decor",
price:"₹6,999",
image:"https://www.nodusrug.it/wp-content/uploads/2024/02/custom-shaggy-rug.jpg"
}
];

const productList = document.getElementById("productList");
const searchInput = document.getElementById("searchInput");

function displayProducts(items){
    productList.innerHTML = "";

    items.forEach(product => {
        productList.innerHTML += `
        <div class="card">
            <img src="${product.image}">
            <h3>${product.name}</h3>
            <p>${product.category}</p>
            <div class="price">${product.price}</div>
        </div>
        `;
    });
}

displayProducts(products);

function filterProduct(category){
    if(category === "all"){
        displayProducts(products);
    }else{
        const filtered = products.filter(item => item.category === category);
        displayProducts(filtered);
    }
}

searchInput.addEventListener("keyup", () => {
    const value = searchInput.value.toLowerCase();

    const filtered = products.filter(item =>
        item.name.toLowerCase().includes(value)
    );

    displayProducts(filtered);
});