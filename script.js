window.onload = function (){
    var localStorageKeyName = 'data';

    loadFromLocalStorage();

    document.querySelector("#btn-add").addEventListener('click',function(){
    var productCode = document.getElementById("productCode"),
    product = document.getElementById("product"),
    qty = document.getElementById("qty"),
    perPrice = document.getElementById("perPrice");

    //Validacion
    if(productCode.value.lenght === 0 || product.value.lenght === 0 || !parseInt(qty.value) || !parseInt(perPrice.value)) return;

    var user = {
        productCode: productCode.value,
        product: product.value,
        qty: qty.value,
        perPrice: perPrice.value
    };

    //Limpiar
    productCode.value = '';
    product.value = '';
    qty.value = '';
    perPrice.value = '';

    //
    appendObjectToLocalStorage(user);
    })

    function appendObjectToLocalStorage(obj){
        var users = [],
        dataInLocalStorage = localStorage.getItem(localStorageKeyName);
        
        if(dataInLocalStorage !== null){
            users = JSON.parse(dataInLocalStorage);
        }
        users.push(obj);

        localStorage.setItem(localStorageKeyName, JSON.stringify(users));

        loadFromLocalStorage();
    }

    function loadFromLocalStorage(){
        var users = [],
        dataInLocalStorage = localStorage.getItem(localStorageKeyName),
        gridBody = document.querySelector("#grid tbody");

        if(dataInLocalStorage !== null){
            users = JSON.parse(dataInLocalStorage);
        }

        //
        gridBody.innerHTML = '';

        users.forEach(function(x,i) {
            var tr = document.createElement("tr"),
            tdproductCode = document.createElement("td"),
            tdproduct = document.createElement("td"),
            tdqty = document.createElement("td"),
            tdperPrice = document.createElement("td"),
            tdRemove = document.createElement("td"),
            btnRemove = document.createElement("button");

            tdproductCode.innerHTML = x.productCode;
            tdproduct.innerHTML = x.product;
            tdqty.innerHTML = x.qty;
            tdperPrice.innerHTML = x.perPrice;

            btnRemove.textContent = 'Remove';
            btnRemove.className = 'btn btn-xs btn-danger';
            btnRemove.addEventListener('click',function() {
                removeFromLocalStorage(i);
            });

            tdRemove.appendChild(btnRemove);
            
            tr.appendChild(tdproductCode);
            tr.appendChild(tdproduct);
            tr.appendChild(tdqty);
            tr.appendChild(tdperPrice);
            tr.appendChild(tdRemove);

            gridBody.appendChild(tr);
        });
    }

    function removeFromLocalStorage(index){
        var users = [],
        dataInLocalStorage = localStorage.getItem(localStorageKeyName);

        users = JSON.parse(dataInLocalStorage);

        users.splice(index, 1);
        
        localStorage.setItem(localStorageKeyName, JSON.stringify(users));
        
        loadFromLocalStorage();
    }
}