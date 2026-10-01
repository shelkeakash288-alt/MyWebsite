// Food data

const foods = [
    {
        id: 1,
        name: "Pizza",
        description: "Cheesy and delicious pizza",
        price: 299,
        image: "🍕"
    },

    {
        id: 2,
        name: "Burger",
        description: "Juicy chicken burger",
        price: 149,
        image: "🍔"
    },

    {
        id: 3,
        name: "Biryani",
        description: "Spicy and flavorful biryani",
        price: 249,
        image: "🍛"
    },

    {
        id: 4,
        name: "French Fries",
        description: "Crispy golden fries",
        price: 99,
        image: "🍟"
    },

    {
        id: 5,
        name: "Sandwich",
        description: "Fresh vegetable sandwich",
        price: 129,
        image: "🥪"
    },

    {
        id: 6,
        name: "Noodles",
        description: "Hot spicy noodles",
        price: 179,
        image: "🍜"
    }
];


let cart = [];


// Display food

function displayFoods(foodList) {

    const container =
        document.getElementById("foodContainer");

    container.innerHTML = "";

    foodList.forEach(function(food) {

        container.innerHTML += `

            <div class="food-card">

                <div class="food-image">
                    ${food.image}
                </div>

                <div class="food-info">

                    <h3>${food.name}</h3>

                    <p>${food.description}</p>

                    <div class="food-bottom">

                        <span class="price">
                            ₹${food.price}
                        </span>

                        <button
                            class="add-button"
                            onclick="addToCart(${food.id})"
                        >
                            Add
                        </button>

                    </div>

                </div>

            </div>

        `;
    });
}


// Add food to cart

function addToCart(id) {

    const food = foods.find(function(item) {
        return item.id === id;
    });

    const existingItem = cart.find(function(item) {
        return item.id === id;
    });


    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({
            ...food,
            quantity: 1
        });

    }

    updateCart();

    alert(food.name + " added to cart!");
}


// Update cart

function updateCart() {

    const cartItems =
        document.getElementById("cartItems");

    const cartCount =
        document.getElementById("cartCount");

    const cartTotal =
        document.getElementById("cartTotal");


    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;


    cart.forEach(function(item) {

        total += item.price * item.quantity;

        count += item.quantity;


        cartItems.innerHTML += `

            <div class="cart-item">

                <div class="cart-item-info">

                    <h4>${item.image} ${item.name}</h4>

                    <p>₹${item.price}</p>

                </div>


                <div class="quantity">

                    <button
                        onclick="decreaseQuantity(${item.id})">
                        -
                    </button>

                    <span>${item.quantity}</span>

                    <button
                        onclick="increaseQuantity(${item.id})">
                        +
                    </button>

                </div>

            </div>

        `;
    });


    cartCount.innerText = count;

    cartTotal.innerText = total;


    if (cart.length === 0) {

        cartItems.innerHTML =
            "<p>Your cart is empty.</p>";

    }
}


// Increase quantity

function increaseQuantity(id) {

    const item = cart.find(function(item) {
        return item.id === id;
    });

    item.quantity++;

    updateCart();
}


// Decrease quantity

function decreaseQuantity(id) {

    const item = cart.find(function(item) {
        return item.id === id;
    });


    item.quantity--;


    if (item.quantity === 0) {

        cart = cart.filter(function(item) {
            return item.id !== id;
        });

    }

    updateCart();
}


// Open cart

function openCart() {

    document.getElementById("cartOverlay").style.display =
        "block";

}


// Close cart

function closeCart() {

    document.getElementById("cartOverlay").style.display =
        "none";

}


// Place order

function placeOrder() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;
    }


    alert(
        "🎉 Order placed successfully!"
    );

    cart = [];

    updateCart();

    closeCart();
}


// Search food

document
    .getElementById("searchInput")
    .addEventListener("input", function() {

        const searchText =
            this.value.toLowerCase();


        const filteredFoods =
            foods.filter(function(food) {

                return food.name
                    .toLowerCase()
                    .includes(searchText);

            });


        displayFoods(filteredFoods);

    });


// Scroll to menu

function scrollToMenu() {

    document
        .getElementById("menu")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// Initial display

displayFoods(foods);

updateCart();