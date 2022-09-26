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

export const returnFilteredArray = (arr, method) => {
    const array = [...arr]
    switch (method) {
        case "id":
            return array.sort((a, b) => a.id - b.id);
        case 'first':
            return array.sort((a, b) => {
                if (a.fName < b.fName) {
                    return -1
                }
                return 0
            });
        case 'last':
            return array.sort((a, b) => {
                if (a.lName < b.lName) {
                    return -1
                }
                return 0
            });
        case 'username':
            return array.sort((a, b) => {
                if (a.username < b.username) {
                    return -1
                }
                return 0
            });
        case 'email':
            return array.sort((a, b) => {
                if (a.email < b.email) {
                    return -1
                }
                return 0
            });
        case 'admin':
            return array.sort((a, b) => {
                if (a.isAdmin < b.isAdmin) {
                    return -1
                }
                return 0
            });
        default:
            return arr;
    }
};
