class Cart {
    render(target = ROOT_CART, isActive = false) {
         target.innerHTML = this.getHTMLString(isActive);
        const cartWrapper = document.querySelector(".cart-wrapper");
        cartWrapper.onclick = (event) => event.target === cartWrapper && this.toggleCartState(); 
    }

    getHTMLString(isActive) {
        return `
            <div class="cart-wrapper ${isActive && "cart-container_active"}">
                <div class="cart-container">
                    <span class="cart__close" onclick="cart.toggleCartState();"></span>
                    <h2 class="cart__title">Корзина товаров</h2>
                    ${
                        localStorageUtil.getCartItems().length
                        ?  `<ul class="cart__items">
                               ${this.generateCartItems()}
                           </ul>`
                        : `<div class="cart__items_empty">Тут пока пусто...</div>`
                    }
                    <div class="cart-summary">
                        <span class="cart-summary_label">Сумма: </span>
                        <small class="cart-item__price">${this.getCartSummary()} ₽</small>
                    </div>
                </div>
            </div>
        `;
    }

    generateCartItems() {
        return CATALOG_ITEM
            .filter(element => localStorageUtil.getCartItems().includes(element.id))
            .map(({name, price}) => `
                <li class="cart-item">
                    <div class="cart-item__text">
                        <span class="cart-item__title">
                            ${name}
                        </span>
                        <small class="cart-item__price">
                            ${price} ₽
                        </small>
                    </div>
                    <div class="cart-item__button_remove" onclick="cart.deleteItem(this, [catalog, header]);"></div>
                </li>
            `
        ).join("");
    }

    getCartSummary() {
        return CATALOG_ITEM
            .filter(element => localStorageUtil.getCartItems().includes(element.id))
            .reduce((acc, {price}) => acc += price, 0);
    }
        

    toggleCartState() {
        document.querySelector(".cart-wrapper").classList.toggle("cart-container_active");
    }

    deleteItem(btn, forRender) {
        const itemName = btn.parentElement.children[0].children[0].innerHTML.trim();
        localStorageUtil.setCartItems(
            CATALOG_ITEM.find(element => element.name === itemName).id
        );
        this.render(ROOT_CART, true);
        forRender.forEach(element => {
            element.render();
        });
    }
}

const cart = new Cart();
cart.render(ROOT_CART);