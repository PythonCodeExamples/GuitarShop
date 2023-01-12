class LocalStorageUtil {
    constructor() {
        this._key= "cartItems";
    }

    getCartItems() {
        const data = localStorage.getItem(this._key);
        return data ? JSON.parse(data) : [];
    }

    setCartItems(value) {
        const state = this.getCartItems()
        state.includes(value)
            ? localStorage.setItem(this._key, JSON.stringify(state.filter(element => element !== value)))
            : localStorage.setItem(this._key, JSON.stringify([...state, value]))
    }
}

const localStorageUtil = new LocalStorageUtil();