const products = [
  {
    id:1,
    name:"Glow Serum",
    category:"Serum",
    price:48,
    image:"img/serum.jpeg"
  },
  {
    id:2,
    name:"Daily Cleanser",
    category:"Cleanser",
    price:28,
    image:"img/cleanser.jpeg"
  },
  {
    id:3,
    name:"Hydra Moisturizer",
    category:"Moisturizer",
    price:42,
    image:"img/moisturizer.jpeg"
  },
  {
    id:4,
    name:"Vitamin C Serum",
    category:"Serum",
    price:46,
    image:"img/vitamin c.jpeg"
  },
  {
    id:5,
    name:"Niacinamide Serum",
    category:"Serum",
    price:50,
    image:"img/niacinamide.jpeg"
  },
  {
    id:6,
    name:"Oily Cleanser",
    category:"Cleanser",
    price:52,
    image:"img/Cleanser1.jpeg"
  },
  {
    id:7,
    name:"Ceramides Moisturizer",
    category:"Moisturizer",
    price:38,
    image:"img/Moisturizer1.jpeg"
  }
];

let cart = [];

const productList = document.getElementById("productList");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const sortFilter = document.getElementById("sortFilter");

function displayProducts(){
  let filtered = products.filter(product => {
    const search = product.name.toLowerCase().includes(searchInput.value.toLowerCase());
    const category = categoryFilter.value === "All" || product.category === categoryFilter.value;
    return search && category;
  });

  if(sortFilter.value === "low"){
    filtered.sort((a,b)=>a.price-b.price);
  }

  if(sortFilter.value === "high"){
    filtered.sort((a,b)=>b.price-a.price);
  }

  productList.innerHTML = "";

  filtered.forEach(product => {
    productList.innerHTML += `
      <div class="product-card">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.category}</p>
        <p class="price">$${product.price}</p>
        <button class="add-btn" onclick="addToCart(${product.id})">+</button>
      </div>
    `;
  });
}

function addToCart(id){
  const product = products.find(item => item.id === id);
  const existing = cart.find(item => item.id === id);

  if(existing){
    existing.quantity++;
  }else{
    cart.push({...product, quantity:1});
  }

  updateCart();
  openCart();
}

function updateCart(){
  const cartItems = document.getElementById("cartItems");
  const cartCount = document.getElementById("cartCount");
  const cartTotal = document.getElementById("cartTotal");

  cartItems.innerHTML = "";

  let total = 0;
  let count = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;
    count += item.quantity;

    cartItems.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}">
        <div>
          <h4>${item.name}</h4>
          <p>$${item.price}</p>
          <p>Quantity: ${item.quantity}</p>
          <button onclick="removeItem(${item.id})">Remove</button>
        </div>
      </div>
    `;
  });

  cartCount.textContent = count;
  cartTotal.textContent = total.toFixed(2);
}

function removeItem(id){
  cart = cart.filter(item => item.id !== id);
  updateCart();
}

function openCart(){
  document.getElementById("cartSidebar").classList.add("active");
  document.getElementById("overlay").style.display = "block";
}

function closeCart(){
  document.getElementById("cartSidebar").classList.remove("active");
  document.getElementById("overlay").style.display = "none";
}

function scrollToProducts(){
  document.getElementById("products").scrollIntoView({
    behavior:"smooth"
  });
}

function goToCheckout(){
  if(cart.length === 0){
    const message = document.getElementById("paymentMessage");
    message.innerHTML = "Please add products first.";
    message.style.color = "red";
    return;
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  window.location.href = "checkout.html";
}

searchInput.addEventListener("input", displayProducts);
categoryFilter.addEventListener("change", displayProducts);
sortFilter.addEventListener("change", displayProducts);

displayProducts();
updateCart();