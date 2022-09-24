const port = process.env.PORT || 3000;
const app = require('./app');
const { conn } = require('./db');
const seed = require('./db/seed');

const init = async () => {
    try {
        if (process.env.SEED === 'true') {
            await seed();
        } else {
            await conn.sync();
        }
        app.listen(port, () => console.log(`listening on port ${port}`));
    } catch (err) {
        console.log(err);
    }
};

init();
