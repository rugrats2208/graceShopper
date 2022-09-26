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