//variable
var showcase = document.getElementById("showcase");
var qtyCart = document.getElementById("qtycart");
var itemsList = [];

//array & variable for image slider
var movingSlide;
var count = 0;
var images = ["./images/shop.jpg", "./images/bike.jpg", "./images/car.jpg", "./images/fridge.jpg", "./images/laptop.jpg", "./images/lcd.jpg", "./images/motor bike.jpg", "./images/table.jpg"];
var next = true;

//cart array
var carts = [];

//on load of website or home page
function wellcome() {
    showcase.className = "slider";
    showcase.innerHTML = null;
    if (localStorage.getItem("myData") === null) {
        // Create Product list
        itemsList = [
            new Product("Bike", 5000, "./images/bike.jpg", "The quick brown fox jumps over the lazy dog", "Vehicles"),
            new Product("Car", 500000, "./images/car.jpg", "The quick brown fox jumps over the lazy dog", "Vehicles"),
            new Product("Fridge", 35000, "./images/fridge.jpg", "The quick brown fox jumps over the lazy dog", "Appliances"),
            new Product("Laptop", 25000, "./images/laptop.jpg", "The quick brown fox jumps over the lazy dog", "Computer"),
            new Product("LCD", 15000, "./images/lcd.jpg", "The quick brown fox jumps over the lazy dog", "Appliances"),
            new Product("Motorbike", 55000, "./images/motor bike.jpg", "The quick brown fox jumps over the lazy dog", "Vehicles"),
            new Product("Computer Table", 10000, "./images/table.jpg", "The quick brown fox jumps over the lazy dog", "Computer")
        ];            
        localStorage.setItem("myData", JSON.stringify(itemsList));
        if (count >=0) {
            count--;
        }            
        mySlide();
        movingSlide = setInterval(() => mySlide(), 5000);
    }            
    else {
        itemsList = JSON.parse(localStorage.getItem("myData"));
        if (count > 0) {
            count--;
        }            
        mySlide();
        movingSlide = setInterval(() => mySlide(), 5000);
    }            
}            

function mySlide() {
    showcase.className = "slider";
    showcase.innerHTML = null;
    if (next === false) {
        count += 2;
    }
    if (count === images.length) {
        count = 0;
    }
    showcase.innerHTML = "<div><img src='" + images[count++] + "'><p><span onclick='slideBack();'>&lt</span> <span onclick='mySlide();'>&gt</span></p></div>";
    next = true;
}            

function slideBack() {
    if (next === true) {
        count -= 2;
    }
    if (count < 0) {
        count = images.length - 1;
    }
    showcase.innerHTML = "<div><img src='" + images[count--] + "'><p><span onclick='slideBack();'>&lt</span> <span onclick='mySlide();'>&gt</span></p></div>";
    next = false;
}


//Constructors method for products
function Product(name, price, source, about, category) {
    this.name = name,
    this.price = price,
    this.source = source,
    this.about = about,
    this.category = category
}            

//Constructors method for Cart
function ProductArrays(name, price, source, qty, value, about, category) {
    this.name = name,
    this.price = price,
    this.source = source,
    this.qty = qty,
    this.value = value,
    this.about = about,
    this.category = category
}        

//Navigation Bar for onclick event handler
function openNav() {
    document.getElementById("sub-cat").className = "show";
}
function closeNav() {
    document.getElementById("sub-cat").className = "hide";
}

//onclick of Product's link
function products(range) {
    clearInterval(movingSlide);
    showcase.className = "product-table";
    showcase.style.cssText = "display:flex";
    showcase.innerHTML = null;
    for (var i = 0; i < itemsList.length; i++) {
        if (itemsList[i].category === range) {
            showcase.innerHTML += "<div><table><tr><td colspan='2'><img src='" + itemsList[i].source + "' width='175' height='150' </td></tr><tr><td>Name</td><td>" + itemsList[i].name + "</td></tr><tr><td>Price</td><td>" + (itemsList[i].price).toLocaleString() + "</td></tr><tr><td>About</td><td>" + itemsList[i].about + "</td></tr><tr><td>Category</td><td>" + itemsList[i].category + "</td></tr><tr><td colspan='2'><button onclick='decr(" + i + ");' style='margin-right:15px;'>-</button><span id='cart" + i + "'>1</span><button onclick='incr(" + i + ");' style='margin-left:15px;'>+</button><button onClick='updateCart("+ i + ");' style='margin-left:15px;'>+Cart</button></td></tr></table></div>";
        }
    }
}

function decr(ind) {
    var qtyInCart = document.getElementById("cart" + ind);
    if (parseInt(qtyInCart.innerHTML) >= 1) {
        qtyInCart.innerHTML = parseInt(qtyInCart.innerHTML) - 1;
    }
    else {
        alert("Please enter Qty in order to add in your cart");
    }
}

function incr(ind) {
    var qtyInCart = document.getElementById("cart" + ind);
    qtyInCart.innerHTML = parseInt(qtyInCart.innerHTML) + 1;
}

//onclick of Cart button
function updateCart(ind) {
    var qtyField = document.getElementById("cart" + ind);
    var matchFound = false;
    if (parseInt(qtyField.innerHTML) > 0) {
        if (carts.length > 0) {
            for (var i = 0; i < carts.length; i++) {
                if (carts[i].name === itemsList[ind].name) {
                    carts[i].name = itemsList[ind].name;
                    carts[i].price = itemsList[ind].price;
                    carts[i].source = itemsList[ind].source;
                    carts[i].qty = carts[i].qty + parseInt(qtyField.innerHTML);
                    carts[i].value = carts[i].qty * carts[i].price;
                    carts[i].about = itemsList[ind].about;
                    carts[i].category = itemsList[ind].category;
                    matchFound = true;
                }
            }
            if (matchFound === false) {
                carts.push(
                    new ProductArrays(itemsList[ind].name, itemsList[ind].price, itemsList[ind].source, parseInt(qtyField.innerHTML), parseInt(qtyField.innerHTML) * itemsList[ind].price, itemsList[ind].about, itemsList[ind].category)
                );
            }
        }
        else {
            carts.push(
                new ProductArrays(itemsList[ind].name, itemsList[ind].price, itemsList[ind].source, parseInt(qtyField.innerHTML), parseInt(qtyField.innerHTML) * itemsList[ind].price, itemsList[ind].about, itemsList[ind].category)
            );
        }
    }
    else {
        alert("Please enter Qty in order to add in your cart");
    }
    qtyCart.innerHTML = "(" + carts.length + ")";
}

//onclick of E-Cart's link
function cart() {
    if (carts.length > 0) {
        clearInterval(movingSlide);
        showcase.className = "cart-table";
        showcase.innerHTML = null;
        var myHeading = "<div><h1>MY E-SHOPPING MALL</h1><h2>Cash memo</h2>";
        var checkout = "<button onClick='checkout();'>Checkout</button></div>";
        var myTable = "<table><tr><th>S.No.</th><th>Image</th><th>Name</th><th>Qty</th><th>Price</th><th>Value</th><th>Delete</th></tr>";
        for (var i = 0; i < carts.length; i++) {
            myTable += "<tr><td>" + (i + 1) + "</td><td><img src='" + carts[i].source + "' width='100' height='100'></td><td>" + carts[i].name + "</td><td><button onclick='cartDecr(" + i + ");' style='margin-right:1px;'>-</button><span id='myCart" + i + "'>" + carts[i].qty + "</span><button onclick='cartIncr(" + i + ");' style='margin-left:1px;'>+</button></td><td>" + (carts[i].price).toLocaleString() + "</td><td>" + (carts[i].value).toLocaleString() + "</td><td><button onclick='deleteCart(" + i + ");'>x</button></td></tr>";
        }    
        var cartQty = 0;
        var cartValue = 0;
        for (var i = 0; i < carts.length; i++) {
            cartQty = parseInt(cartQty) + parseInt(carts[i].qty);
            cartValue = cartValue + carts[i].value;
        }    
        myTable += "<tr><th></th><th></th><th>Total</th><th>" + cartQty + "</th><th></th><th>" + cartValue.toLocaleString() + "</th><th></th></tr>";
        myTable += "</table>";
        showcase.innerHTML = myHeading + myTable + checkout;
    }    
    else {
        alert("Your cart is empty, please place your order in product tab");
    }    
}

function cartDecr(ind) {
    if (carts[ind].qty === 1) {
        deleteCart(ind);
    }
    else {
        carts[ind].qty--;
        carts[ind].value = carts[ind].qty * carts[ind].price;
        cart();
    }
}

function cartIncr(ind) {
    carts[ind].qty++;
    carts[ind].value = carts[ind].qty * carts[ind].price;
    cart();
}    

//onclick of delete in cart box
function deleteCart(ind) {
    carts.splice(ind, 1);
    if (carts.length > 0) {
        qtyCart.innerHTML = "(" + carts.length + ")";
        cart();
    }
    else {
        qtyCart.innerHTML = null;
        wellcome();
    }
}

//onclick of checkout
function checkout() {
    clearInterval(movingSlide);
    showcase.className = "thanks";
    var cartValue = 0;
    for (var i = 0; i < carts.length; i++) {
        cartValue = cartValue + carts[i].value;
    }
    var myHeading = "<div><h1>PAYMENT</h1>";
    var myTable = "<table><tr><td>Name</td><td><input type='text' name='clientname'></td></tr><tr><td>E-mail Address</td><td><input type='email' name='clientemail'></td><tr><td>Cell/Phone</td><td><input type='text' name='clientcell'></td></tr><td>Payment Type</td><td><select><option>Credit Card</option><option>Debit Card</option><option>Cash on Doorstep</option></select></td></tr><tr><td>Value</td><td>" + cartValue.toLocaleString() + "</td></tr></table>";
    var myDone = "<button onclick='thanks();'>OK</button></div>";
    showcase.innerHTML = myHeading + myTable + myDone;
}

//onclick of ok in checkout
function thanks() {
    showcase.innerHTML = "<div><h1>THANKS FOR PURCHASING</h1><button onclick='wellcome();'>Home Page</button></div>";
    carts = new Array();
    qtyCart.innerHTML = null;
}

//onclick of About's link
function about() {
    clearInterval(movingSlide);
    showcase.className = "about";
    showcase.innerHTML = null;
    var aboutContent = "<div><dl><dt>Our Motives</dt><dd>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, quam? Numquam labore odio minus nostrum rem totam blanditiis quasi commodi voluptatum voluptate neque eum dolorum tempora ea dignissimos quae consectetur, ut inventore? Dignissimos, in. Veritatis, sit, distinctio iure corrupti et aliquam mollitia, reiciendis sed expedita magnam voluptates eum voluptate maiores!</dd><dt>Our Location</dt><dd>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum quae, ullam laudantium delectus qui quibusdam minus modi! Fugit obcaecati sapiente cupiditate eos facere fugiat delectus iure! Maxime delectus veritatis sed ratione, vero ullam voluptatibus ducimus perferendis nihil quod fugit cum.</dd><dt>Contact us</dt><dd>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio, laboriosam doloribus. Dicta, ab dolorum nostrum quaerat dolorem incidunt, temporibus tempore consequuntur, eum praesentium sed quibusdam architecto. Atque quasi quam ipsam?</dd></dl></div><aside><p><b>News: </b>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio, laboriosam doloribus. Dicta, ab dolorum nostrum quaerat dolorem incidunt, temporibus tempore consequuntur, eum praesentium sed quibusdam architecto. Atque quasi quam ipsam?Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum quae, ullam laudantium delectus qui quibusdam minus modi! Fugit obcaecati sapiente cupiditate eos facere fugiat delectus iure! Maxime delectus veritatis sed ratione, vero ullam voluptatibus ducimus perferendis nihil quod fugit cum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio, laboriosam doloribus. Dicta, ab dolorum nostrum quaerat dolorem incidunt, temporibus tempore consequuntur, eum praesentium sed quibusdam architecto. Atque quasi quam ipsam?</p></aside>";
    showcase.innerHTML = aboutContent;
}