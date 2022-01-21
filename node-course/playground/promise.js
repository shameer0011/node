const doWorkProimise = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject("error")
        resolve([1, 2, 3])
    }, 2000)
})
doWorkProimise.then((result) => {
    console.log(result)
}).catch((error) => {
    console.log(error)
})

// promise chaining;
const a = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b)
        }, 2000)
    })
}

// a(10, 12).then((sum) => {
//     console.log(sum)
//     a(sum, 10).then((agianSum) => {
//         console.log(agianSum)
//         a(agianSum, 10).then((twiseSum) => {
//             console.log(twiseSum)
//         })
//     })
// })

// solution of promise chaining is
a(10, 12).then((sum) => {
    console.log(sum)
    return a(sum, 10)
}).then((againSum) => {
    console.log(againSum)
    return a(againSum, 10)
}).then((twiceSum) => {
    console.log(twiceSum)
})