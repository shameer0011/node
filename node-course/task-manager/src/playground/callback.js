const doWorkCallbak = (callback) => {
    setTimeout(() => {
        // callback("error", undefined)
        callback(undefined, [1, 2, 3,])
    }, 2000)
}

doWorkCallbak((error, result) => {
    // console.log(error, "error");
    console.log(result, "result")
})