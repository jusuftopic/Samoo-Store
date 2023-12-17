function Products(category, name, price, colors, stock, sizes) {
     this.category = category,
     this.name = name,
     this.price = price,
     this.color = colors,
     this.stock = stock,
     this.sizes = sizes
}

var products = {
    footwears: {
        bonzesandal: new Products("Footwears", "Bonze sandal", 1200, "Brown/Blue", "Yes", "35/32/30"),
        learshoes: new Products("Footwears", "Lear shoes", 800, "Brown/Blue/Black", "Yes", "18/21/38"),
        candyshoes: new Products("Footwears", "Candy shoes", 1900, "Light-Blue", "Yes", "30/27"),
        cattyshoes: new Products("Footwears", "Catty shoes", 1300, "Burgendy", "No", "32"),
        skvlfsandal: new Products("Footwears", "Skvlf sandal", 700, "Black", "Yes", "26/30"),
        peshawarisandal: new Products("Footwears", "Peshawari sandal", 2400, "Black/Brown/Grey", "No", "35/32"),
    },
    clothes: {
        addidashoody: new Products("Clothes", "Addidas hoody", 2100, "Grey/Light-Red", "Yes", "32-26"),
        bossshirt: new Products("Clothes", "Boss shirt", 1000, "Blue/Off-White", "No", "24-28"),
        chinospant: new Products("Clothes", "Chinos pant", 650, "Green-Dark", "Yes", "28-34"),
        handytshirt: new Products("Clothes", "Handy tshirt", 300, "Red/Mehrun", "No", "23-27"),
        khankurta: new Products("Clothes", "Khan kurta", 1650, "Black/Blue/Grey", "Yes", "20-41"),
        denimnarrow: new Products("Clothes", "Denim narrow", 1900, "Blue/Dark-Blue", "Yes", "28-32"),
    },
    watches: {
        bosswrist: new Products("Watches", "Boss wrist", 1400, "Mehrun", "Yes", "28"),
        eaglecandy: new Products("Watches", "Eagle candy", 750, "Light-Yello", "No", "23"),
        armanicab: new Products("Watches", "Armani cab", 2180, "Grey", "Yes", "26"),
        rolexraz: new Products("Watches", "Rolex raz", 3800, "Light-Grey", "Yes", "32"),
        radoblacky: new Products("Watches", "Rado blacky", 3300, "Black", "Yes", "30"),
        appleiclock: new Products("Watches", "Apple iclock", 2730, "Black/Grey", "No", "24")
    },
}


function filter() {
    var userInput = getUserInput();
    var found = false;

    // Filter je napravljen tako da user mora upisati cijelo ime produkta (mala/velika slova nisu bitna)
    if (userInput) {
        // category keys: footwears, clothes, watches
        for (var categoryKey in products) {
            // product keys: bonzesandal, radoblacky ...
            for (var productKey in products[categoryKey]) {
                var productName = products[categoryKey][productKey].name.toLowerCase();
                 if (userInput === productName) {
                    found = true;
                    document.getElementById("userInput").value = '';
                    document.getElementById("displaye").style.display = 'none';
                    document.getElementById("products").style.display = 'none';
                    document.getElementById("displayc").style.display = 'block';
                    document.getElementById("displayc").innerHTML = document.getElementById(productKey).innerHTML;
                    document.getElementById("topButton").style.display = 'none';
                    document.getElementById("homeButton").style.display = 'block';
                }
            }
        }
        if (!found) {
            document.getElementById("displayc").style.display = 'none';
            document.getElementById("products").style.display = 'none';
            document.getElementById("displaye").style.display = 'block';
            document.getElementById("topButton").style.display = 'none';
            document.getElementById("displaye").innerText = "NO RESULTS FOUND!";
            document.getElementById("homeButton").style.display = 'block';
        }
    }
}

function getUserInput() {
    var userInput = document.getElementById("userInput").value.trim();
    return userInput.toLowerCase();
}

function showAllProducts() {
    setTimeout(function () {
        document.getElementById("userInput").value = '';
        document.getElementById("displayc").style.display = 'none';
        document.getElementById("products").style.display = 'block';
        document.getElementById("homeButton").style.display = 'none';
        document.getElementById("displaye").style.display = 'none';
    }, 1000)
}

function details(key, src) {
    for (var categoryKey in products) {
        for (var productKey in products[categoryKey]) {
            if (key === productKey) {
                swal.fire({
                    title: "Ime: " + products[categoryKey][productKey].name,
                    html: "Kategorija: " + products[categoryKey][productKey].category + "<br>"
                        + "Boja: " + products[categoryKey][productKey].color + "<br>"
                        + "Stanje: " + products[categoryKey][productKey].stock + "<br>"
                        + "Velicina: " + products[categoryKey][productKey].sizes + " <br> "
                        + "Cijena : " + products[categoryKey][productKey].price + " KM",
                    textColor: "red",
                    imageUrl: src,
                    imageWidth: 300,
                    imageHeight: 250,
                    imageAlt: 'Custom image',
                    animation: false,
                })
            }
        }
    }
}
function sellProductInfoGet(id) {
    var date = new Date();
    var todayDate = date.getDate();
    var todayMonth = date.getMonth() + 1;
    todayMonth = Number(todayMonth);
    var todayyear = date.getFullYear();
    for (var categoryKey in products) {
        for (var productKey in products[categoryKey]) {
            if (id === productKey) {
                document.getElementById('productName').innerText = products[categoryKey][productKey].name;
                document.getElementById("date").innerText = todayDate + "/" + todayMonth + "/" + todayyear;
                document.getElementById('priceOfProduct').innerText = products[categoryKey][productKey].price;
                document.getElementById("mode").style.display = 'block';
            }
        }
    }
}

var counter = 0;
var sold = [];
localStorage.setItem("sold", JSON.stringify(sold));

function sellProduct(id) {
    // ukoloni prazan prostor u string name product
    var nameProduct = id.replace(/[\s-]/g, '').toLowerCase();
    var quantity = Number(document.getElementById("quantityOfProduct").value);
    
     if (quantity < 1 || quantity > 9 || isNaN(quantity)) {
         showError("Stanje treba biti od 1 do 9.");
          return;
        }

    var errorElement = document.getElementById("errorinSaleInfo");
    for(var category in products) {
        if(products.hasOwnProperty(category)) {
            var productDetails = products[category] [nameProduct];
            if(productDetails) {
                var NAME = productDetails.name;
                var PRICE = productDetails.price;
                var QUANTITY = quantity;
                var TOTALPRICE = QUANTITY * PRICE;

                var date = new Date();
                var todayDate = date.getDate();
                var todayMonth = date.getMonth() + 1;
                var DATE = todayDate + "/" + todayMonth;

                swal.fire({
                    type: "success",
                    title: "Prodano!",
                    text: "Product je prodan!",
                });

                // aktualiziraj prodane produkte u local storage
                updateSoldArray(DATE, NAME, PRICE, QUANTITY, TOTALPRICE);

                document.getElementById("quantityOfProduct").value = "";
                errorElement.style.display = 'none';
                document.getElementById("mode").style.display = 'none';
                return;
            }
        }
    }

    showError("Produkt nije pronadjen")
}

function updateSoldArray(date, name, price, quantity, totalPrice) {
    var sold = JSON.parse(localStorage.getItem("sold")) || [];
    var soldItem = {
        date: date,
        name: name,
        price: price,
        quantity: quantity,
        totalprice: totalPrice,
    };
    sold.push(soldItem);
    localStorage.setItem("sold", JSON.stringify(sold));
}

function showError(message) {
    var errorElement = document.getElementById("errorinSaleInfo");
    errorElement.innerHTML = message;
    errorElement.style.display = 'block';
    document.getElementById("quantityOfProduct").value = "";
}


function remove(id) {
    var target = document.getElementById(id);
    swal.fire({
        type: "question",
        title: "Da li siguno želite izbrisati produkt?",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: 'rgb(106, 162, 245)',
        confirmButtonText: 'Izbriši!',
        cancelButtonText: "Odustani",
        confirmButtonColor: "rgb(87, 206, 87)",
    }).then((result) => {
        if (result.value) {
            target.remove();
            swal.fire({
                type: "success",
                title: "Izbrisan!"
            })
        }
    })
}

function addProduct(category) {
    document.getElementById("modeForAdd").style.display = 'block';
    document.getElementById('category').innerHTML = category;
}

var counterFootwear = 6;
var counterClothes = 6;
var counterWatches = 6;

function insertData(category) {
    // prvo je potrebno skupiti podatke iz forme
    var name = document.getElementById("addName").value;
    var price = Number(document.getElementById("addPrice").value);
    var color = document.getElementById("addColors").value;
    var stock = document.getElementById("addStock").value;
    var size = document.getElementById("addSize").value;

    // prvo slovo produkta je veliko slovo
    var nameCapitalized = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

    // očisti podatke iz forme
    document.getElementById("addName").value = "";
    document.getElementById("addPrice").value = "";
    document.getElementById("addColors").value = "";
    document.getElementById("addStock").value = "";
    document.getElementById("addSize").value = "";
    document.getElementById("modeForAdd").style.display = 'none';

    var productToAdd = new Products(category, nameCapitalized, price, color, stock, size);

    // dodaj produkt u njegovu kategoriju
    for(var categoryKey in products) {
        if(categoryKey === category) {
            products[categoryKey].newProduct = productToAdd;
        }
    }

    // inicijalno svaka kategorija ima 6 produkta. Potrebno je naci odgovarajuci 
    // counter za dodani produkt.
    var counter = getCounter(category);
    counter++;

    displayNewProduct(category, nameCapitalized, counter, price);

    resetAddButtonStyle(category);
}

function getCounter(category) {
    switch(category) {
        case "footwears": return counterFootwear;
        case "clothes": return counterClothes;
        case "watches": return counterWatches;
        default: return 0;
    }
}

function displayNewProduct(category, name, counter, price) {
    var maintarget = document.getElementById("newAddedOf" + category.charAt(0).toUpperCase() + category.slice(1));

    var mainDiv = document.createElement("div");
    mainDiv.setAttribute("class", "newOne");
    mainDiv.setAttribute("id", name);

    var subDiv = document.createElement("div");
    subDiv.setAttribute("class", "imgCover");
    subDiv.setAttribute("id", category.charAt(0) + counter);

    var img = document.createElement("img");
    img.setAttribute("src", category.charAt(0) + counter + ".png");
    img.setAttribute("width", "200px");
    img.setAttribute("height", "150px");
    img.setAttribute("alt", "Please wait Loading...");

    subDiv.appendChild(img);
    mainDiv.appendChild(subDiv);

    var p = document.createElement("p");
    p.setAttribute("class", "proInfoN");
    p.setAttribute("id", name + "1");
    p.setAttribute("onclick", 'details(' + "'" + name + "'" + ',' + "'" + './' + category.charAt(0) + counter + ".png" + "'" + ')');
    var ptext = document.createTextNode(name);
    p.appendChild(ptext);

    mainDiv.appendChild(p);

    var priceInfo = document.createElement("p");
    priceInfo.setAttribute("class", "proInfo");
    var priceText = document.createTextNode(price + " KM");
    priceInfo.appendChild(priceText);
    mainDiv.appendChild(priceInfo);

    var editBtn = createButton("adminBtnsEdit", "Više", 'details(' + "'" + name + "'" + ',' + "'" + './' + category.charAt(0) + counter + ".png" + "'" + ')', "fa fa-arrow-up", "MORE");
    mainDiv.appendChild(editBtn);

    var deleteBtn = createButton("adminBtnsDelete", "Izbriši produkt", 'remove(' + "'" + name + "'" + ")", "fa fa-trash", "Delete");
    mainDiv.appendChild(deleteBtn);

    maintarget.appendChild(mainDiv);
}

function createButton(className, title, onclick, iconClass, buttonText) {
    var button = document.createElement("button");
    button.setAttribute("class", className);
    button.setAttribute("title", title);
    button.setAttribute("onclick", onclick);

    var icon = document.createElement("i");
    icon.setAttribute("class", iconClass);
    button.appendChild(icon);

    var buttonTextElement = document.createTextNode(" " + buttonText);
    button.appendChild(buttonTextElement);

    return button;
}

function resetAddButtonStyle(category) {
    var addButton = document.getElementById(category + "Add");
    addButton.removeAttribute("onclick");
    addButton.style.backgroundColor = "rgb(164, 252, 164)";
}