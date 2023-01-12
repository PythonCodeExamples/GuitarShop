class Catalog {
// STATIC FIELDS
    static #btnUncheckedContent = "Добавить в корзину";
    static #btnCheckedContent = "Убрать из корзины";

// STATIC METHODS & HELPERS
    static initButtonsCallback() {
        const buttonsArr = document.querySelectorAll(".catalog-item__button");
        buttonsArr.forEach((button) => {
            button.onclick = (event) => {
                // Add/Remove id from Local Storage
                localStorageUtil.setCartItems(event.target.parentElement.id);

                // Change button's innerHTML
                event.target.innerHTML = event.target.innerHTML.trim() === Catalog.#btnCheckedContent
                    ? Catalog.#btnUncheckedContent
                    : Catalog.#btnCheckedContent;

                // Change button's classList
                event.target.classList.toggle("catalog-item__button_active");

                // Refresh counter in header
                header.innerContent = localStorageUtil.getCartItems().length;

                // Update cart
                cart.render(ROOT_CART);
            }
        });
    }

// PUBLIC METHODS
    // Returns HTML ul with li of CATALOG_ITEMS
    render(target = ROOT_CATALOG) {
        target.innerHTML = this.#createUl();
        Catalog.initButtonsCallback();
    }


// PRIVATE METHODS
    // Returns HTML ul of CATALOG_ITEMS
    #createUl() {
        const checkedButtonsIds = localStorageUtil.getCartItems();
        const arrOfLi = CATALOG_ITEM.map((element) => this.#createLi(element, checkedButtonsIds));
        return `<ul class="catalog-container">${arrOfLi.join("")}</ul>`;
    }

    // Returns HTML li for one item of CATALOG_ITEMS
    #createLi({id, name, price, img}, checkedIds) {
        // If element's ID is in the Local Storage then marks element's button as checked
        const [checkedButtonClassname, checkedButtonContent] =
            checkedIds.includes(id) 
                ? ["catalog-item__button_active", Catalog.#btnCheckedContent]
                : ["", Catalog.#btnUncheckedContent];

        return `<li id="${id}" class="catalog-item">
                    <span class="catalog-item__name">${name}</span>
                    <img class="catalog-item__image" src="${img}" alt="guitar image">
                    <span class="catalog-item__price">💳 ${price.toLocaleString() + " ₽"}</span>
                    <button class="catalog-item__button ${checkedButtonClassname}">
                        ${checkedButtonContent}
                    </button>
                </li>`;
    }
}

const catalog = new Catalog();
catalog.render(ROOT_CATALOG);
