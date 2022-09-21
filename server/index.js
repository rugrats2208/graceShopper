const port = process.env.PORT || 3000;
const app = require('./app');
const conn = require('./db');

const init = async () => {
    try {
        await conn.syncAndSeed();
        app.listen(port, () => console.log(`listening on port ${port}`));
    } catch (err) {
        console.log(err);
    }
};

<<<<<<< HEAD
init();
=======
// app.listen(port, () => console.log(`listening on port ${port}`));

init();
>>>>>>> 224337571972d4d985e19e5a8af766b538270c92
