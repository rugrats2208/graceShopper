const conn = require('./db');

(async () => {
    try {
        await conn.syncAndSeed();
    } catch (err) {
        console.log(err);
    }
})();
