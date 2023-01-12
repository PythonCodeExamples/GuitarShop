class Header {
    render(target = ROOT_HEADER) {
        target.innerHTML = this.getHTMLString();
    }

    getHTMLString() {
        return `
            <div class="header-container">
                <div class="header-logo">
                    <img class="header-logo__image" alt="Shop logo" src="./img/pick.svg">
                    <h1 class="header-logo__title">VladosGuitarShop</h1>
                </div>
                <div class="header-counter" onclick="cart.toggleCartState();">
                    <img class="header-counter__icon" alt="Guitar icon" src="./img/guitar.svg">
                    <span class="header-counter__value">${localStorageUtil.getCartItems().length}</span>
                </div>
            </div>
        `
    }

    set innerContent(content) {
        document.querySelector(".header-counter__value").innerHTML = content;
    }
};

const header = new Header();
header.render(ROOT_HEADER);