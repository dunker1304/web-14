const muaRau = (tien) => {
    return new Promise((resolve, reject) => {
        if(tien >= 10000) {
            resolve("Ok a giai");
        } else {
            reject("Deo");
        }
    });
}

// muaRau(9000)
//     .then((message) => {
//         if(message == "Deo") return muaRau(10000);
//     })
//     .then((message) => console.log(message))
//     .catch((error) => console.log(error));

const asyncMuaRau = async () => {
    try {
        const message1 = await muaRau(9000);
        console.log(message1);
        const message2 = await muaRau(10000);
        console.log(message2);
    } catch (error) {
        console.log(error);
    }
}

asyncMuaRau();