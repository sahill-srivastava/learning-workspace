const fs = require("fs");
const crypto = require("crypto");

process.env.UV_THREADPOOL_SIZE = 2;

crypto.pbkdf2("password", "salt", 5000000, 50, "sha512", (err, key) => {
    console.log("1 = cryptoPBKDF2 done");
})
crypto.pbkdf2("password", "salt", 5000000, 50, "sha512", (err, key) => {
    console.log("2 = cryptoPBKDF2 done");
})
crypto.pbkdf2("password", "salt", 5000000, 50, "sha512", (err, key) => {
    console.log("3 = cryptoPBKDF2 done");
})
crypto.pbkdf2("password", "salt", 5000000, 50, "sha512", (err, key) => {
    console.log("4 = cryptoPBKDF2 done");
})
crypto.pbkdf2("password", "salt", 5000000, 50, "sha512", (err, key) => {
    console.log("5 = cryptoPBKDF2 done");
})


/*
Output console:

4 = cryptoPBKDF2 done
1 = cryptoPBKDF2 done
3 = cryptoPBKDF2 done
2 = cryptoPBKDF2 done

2nd attempt
3 = cryptoPBKDF2 done
2 = cryptoPBKDF2 done
4 = cryptoPBKDF2 done
1 = cryptoPBKDF2 done

Explanation: 
-> It describes, how all 4 threads pools handle crypto task and assign task in random basis
-> Order of execution is random.
-> first 4 task executed and rest will wait in queue then they processed/execute whenever pool is empty
-> Thread pool size can be changed by using this method: process.env.UV_THREADPOOL_SIZE = 2; by default is 2 make it 2.

*/