
    let selectedProduct = null;
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));


        /* VIEW DETAILS */
        document.querySelectorAll(".view-btn").forEach(btn => {
        btn.addEventListener("click",

            function () {

                if (loggedInUser) {
                    const card = this.closest(".product-card");

                    selectedProduct = {
                        title: card.querySelector(".product-title").innerText,
                        price: parseInt(card.querySelector(".product-price").innerText.replace(/\D/g, '')),
                        image: card.querySelector(".product-image").src,
                        description: card.querySelector(".product-description").dataset.full,
                    };

                    modalTitle.innerText = selectedProduct.title;
                    modalPrice.innerText = "$" + selectedProduct.price;
                    modalDescription.innerText = selectedProduct.description;
                    modalImage.src = selectedProduct.image;

                    productModal.style.display = "flex";
                } else {
                    successMsg.className = "alert alert-danger text-center";
                    successMsg.innerText = "!! Please login first to View Product-Full details...";
                    successMsg.classList.remove("d-none");

                    setTimeout(() => {
                        successMsg.classList.add("d-none");
                    }, 2000);
                }
            }


        );
        });

function closeModal() {
        productModal.style.display = "none";
        }

        /* ADD TO CART FROM CARD */
        document.querySelectorAll(".add-btn").forEach(btn => {
        btn.addEventListener("click", function () {
            const card = this.closest(".product-card");

            selectedProduct = {
                title: card.querySelector(".product-title").innerText,
                price: parseInt(card.querySelector(".product-price").innerText.replace(/\D/g, '')),
                image: card.querySelector(".product-image").src
            };

            addToCart();
        });


 });

    /* CART LOGIC */
function addToCart() {

            const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const successMsg = document.getElementById("successMsg");

    if (loggedInUser) {

        let cart = JSON.parse(localStorage.getItem(loggedInUser.email)) || [];

                let item = cart.find(p => p.title === selectedProduct.title);

    if (item) {
        item.qty += 1;
                } else {
        cart.push({ ...selectedProduct, qty: 1 });
                }

    localStorage.setItem(loggedInUser.email, JSON.stringify(cart));
        showToast("Item Added Successfuly...", "success");

    closeModal();

            } else {

        successMsg.className = "alert alert-danger text-center";
        successMsg.innerText = "!! Please login first to add items to cart...";
        successMsg.classList.remove("d-none");

                setTimeout(() => {
        successMsg.classList.add("d-none");
                }, 2000);
    }
 }


        // Example: Assuming you store user data in localStorage as:
        // localStorage.setItem("user", JSON.stringify({email: "test@example.com" }));

document.addEventListener("DOMContentLoaded", function () {
            const navItem = document.getElementById("navitem");
    const cartLink = document.getElementById("cart-link");
    const logoutLink = document.getElementById("logout-link");

    // Get user from localStorage
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));


    if (loggedInUser) {
        // User is logged in
        navItem.innerHTML = ""; // remove SignUp/Login links
    cartLink.style.display = "block"; // show cart
    logoutLink.style.display = "block"; // show cart
            }
            
});

function removeUser() {
    localStorage.removeItem("loggedInUser");

    showToast("Your Logout Successfully", "warning");
    
    successMsg.classList.remove("d-none");

            setTimeout(() => {
        window.location.href = "homescreen.html";
            } , 2000);
            
}


document.querySelectorAll(".product-description").forEach(desc => {
            if (!desc.dataset.full) {
        desc.dataset.full = desc.innerText; // store full text
            }
 
              const fullText = desc.dataset.full;

            desc.innerText = fullText.length > 50
        ? fullText.slice(0, 50) + "..."
        : fullText;
});


function showToast(message, type = "success") {
    const toastEl = document.getElementById("successMsg");
    const toastText = document.getElementById("toastText");

    toastEl.className = `toast align-items-center text-bg-${type} border-0`;
    toastText.innerText = message;

    const toast = new bootstrap.Toast(toastEl, { delay: 2000 });
    toast.show();
}

