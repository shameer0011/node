// const geocode = (item, callback) => {
//     const data = {
//         lat: 0,
//         long: 0
//     }
//     return data
// }
// const f = geocode();
// console.log(f)

const geocode = (itm, callback) => {
    setTimeout(() => {
        const data = {
            lat: 0,
            long: 0,
            itm
        }
        // return data
        callback(data)
    }, 2000);

}
geocode('shameer', (val) => {

    console.log(val)
});

const add = (a, b, totalCallback) => {
    setTimeout(() => {
        const c = a + b;
        totalCallback(c)
    }, 2000);
}

add(2, 3, (sum) => {
    console.log(sum)
})
