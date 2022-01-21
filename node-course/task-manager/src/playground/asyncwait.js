const a = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (a < 0 || b < 0) {
                reject('Not required -ve numbers')
            }
            resolve(a + b)
        }, 2000)
    })
}

const add = async () => {
    const sum = await a(10, 12);
    const sum1 = await a(sum, 30);
    const sum2 = await a(sum1, -3);
    console.log(sum2, "1")
    return sum2
}

add().then((sum) => {
    console.log(sum, "2")
}).catch((e) => {
    console.log(e, "eeee")
})