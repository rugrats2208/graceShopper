export const usdCurrencyFormatter = (num) => {
    const str = `${num}`;
    if (str.length <= 2) {
        return `.${str}`
    }
    return `${str.slice(0, str.length - 2)}.${str.slice(str.length - 2)}`
}

export const removeDecimal = (str) => {
    let returnString = ''
    for (let i = 0; i < str.length; i++) {
        if (str[i] !== '.') {
            returnString += str[i]
        }
    }
    return returnString;
}

export const sortedProductsArray = (arr, method, sel) => {
    const array = [...arr];
    switch (method) {
        case "id":
            return sel ? array.sort((a, b) => a.id - b.id) : array.sort((a, b) => b.id - a.id);
        case 'name':
            if (sel) {
                return array.sort((a, b) => {
                    if (a.name < b.name) {
                        return -1
                    }
                    return 0
                });
            } else {
                return array.sort((a, b) => {
                    if (b.name < a.name) {
                        return -1
                    }
                    return 0
                });
            }
        case 'price':
            if (sel) {
                return array.sort((a, b) => {
                    if (a.price < b.price) {
                        return -1
                    }
                    return 0
                });
            } else {
                return array.sort((a, b) => {
                    if (b.price < a.price) {
                        return -1
                    }
                    return 0
                });
            }
        case 'stock':
            if (sel) {
                return array.sort((a, b) => {
                    if (a.stock < b.stock) {
                        return -1
                    }
                    return 0
                });
            } else {
                return array.sort((a, b) => {
                    if (b.stock < a.stock) {
                        return -1
                    }
                    return 0
                });
            }
        default:
            return arr;
    }
};

export const sortedUsersArray = (arr, method, sel) => {
    const array = [...arr]
    switch (method) {
        case "id":
            return sel ? array.sort((a, b) => a.id - b.id) : array.sort((a, b) => b.id - a.id);
        case 'first':
            if (sel) {
                return array.sort((a, b) => {
                    if (a.fName < b.fName) {
                        return -1
                    }
                    return 0
                });
            } else {
                return array.sort((a, b) => {
                    if (b.fName < a.fName) {
                        return -1
                    }
                    return 0
                });
            }
        case 'last':
            if (sel) {
                return array.sort((a, b) => {
                    if (a.lName < b.lName) {
                        return -1
                    }
                    return 0
                });
            } else {
                return array.sort((a, b) => {
                    if (b.lName < a.lName) {
                        return -1
                    }
                    return 0
                });
            }
        case 'username':
            if (sel) {
                return array.sort((a, b) => {
                    if (a.username < b.username) {
                        return -1
                    }
                    return 0
                });
            } else {
                return array.sort((a, b) => {
                    if (b.username < a.username) {
                        return -1
                    }
                    return 0
                });
            }
        case 'email':
            if (sel) {
                return array.sort((a, b) => {
                    if (a.email < b.email) {
                        return -1
                    }
                    return 0
                });
            } else {
                return array.sort((a, b) => {
                    if (b.email < a.email) {
                        return -1
                    }
                    return 0
                });
            }
        case 'admin':
            if (sel) {
                return array.sort((a, b) => {
                    if (a.isAdmin < b.isAdmin) {
                        return -1
                    }
                    return 0
                });
            } else {
                return array.sort((a, b) => {
                    if (b.isAdmin < a.isAdmin) {
                        return -1
                    }
                    return 0
                });
            }
        default:
            return arr;
    }
};
