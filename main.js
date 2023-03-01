var productNameInput = document.getElementById("productName"); // elinput kolo
var productPriceInput = document.getElementById("productPrice"); // elinput kolo
var productCategoryInput = document.getElementById("productCategory"); // elinput kolo
var productDescInput = document.getElementById("productDesc"); // elinput kolo
var addBtn = document.getElementById("addBtn");
var inputs = document.getElementsByClassName("form-control");

var currentIndex = 0 ;

var products = [];
if (JSON.parse(localStorage.getItem("productsList")) != null) {
    products = JSON.parse(localStorage.getItem("productsList"));
    disPlayData();
}

addBtn.onclick = function () {
    if (addBtn.innerHTML == 'Add Product') {
        addProduct();

    } else {
        updatProduct()
    }

    disPlayData();
    resetInput();

};

function addProduct() {
    var product = {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        desc: productDescInput.value,
    };
    products.push(product);
    localStorage.setItem("productsList", JSON.stringify(products));
}

function disPlayData() {
    var cartona = "";
    for (var i = 0; i < products.length; i++) {
        cartona += `<tr">
        <td>${i + 1}</td>
        <td>${products[i].name}</td>
        <td>${products[i].price}</td>  
        <td>${products[i].category}</td>
        <td>${products[i].desc}</td>
        <td><button onclick="getProductInfo(${i})" class="btn btn-outline-warning">update</button></td>
        <td><button onclick="deleteProduct(${i})" class="btn btn-outline-danger">delete</button></td>
        </tr>`;
    }
    document.getElementById("tableBody").innerHTML = cartona;
}

function deleteProduct(index) {
    products.splice(index, 1);
    disPlayData();
    localStorage.setItem("productsList", JSON.stringify(products));
}

function getProductInfo(index) {

    currentIndex = index;

    var currentProduct = products[index]
    productNameInput.value = currentProduct.name
    productPriceInput.value = currentProduct.price
    productCategoryInput.value = currentProduct.category
    productDescInput.value = currentProduct.desc
    addBtn.innerHTML = 'Updat Product'
}

function updatProduct() {
    var product =
    {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        desc: productDescInput.value,
    };
    products[currentIndex] = product
    localStorage.setItem('productsList',JSON.stringify(products))
    addBtn.innerHTML = 'Add Product'


}


function resetInput() {
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
    }
}

function search(searchtext) {
    var cartona = "";
    for (var i = 0; i < products.length; i++) {
        if (products[i].name.toLowerCase().includes(searchtext.toLowerCase())) {
            cartona += `<tr">
            <td>${i + 1}</td>
            <td>${products[i].name}</td>
            <td>${products[i].price}</td>  
            <td>${products[i].category}</td>
            <td>${products[i].desc}</td>
            <td><button onclick="getProductInfo(${i})" class="btn btn-outline-warning">update</button></td>
            <td><button onclick="deleteProduct(${i})" class="btn btn-outline-danger">delete</button></td>
            </tr>`;
        }
    }
    document.getElementById("tableBody").innerHTML = cartona;
}

var nameAlert = document.getElementById('nameAlert');


productNameInput.onkeyup=function(){
    var nameRejes=/^([A-Z][a-z]{2,8}|[أ-ي]{2,10})$/;
    if (nameRejes.test(productNameInput.value)) {
        addBtn.removeAttribute('disabled')
        productNameInput.classList.add('is-valid')
        productNameInput.classList.remove('is-invalid')
        nameAlert.classList.add('d-none');

    }else{
        addBtn.disabled=true
        productNameInput.classList.add('is-invalid')
        productNameInput.classList.remove('is-valid')
        nameAlert.classList.remove('d-none');

    }
}
