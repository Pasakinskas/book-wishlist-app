import express, { Application } from 'express';

function createServer(port: number) {
    const app: Application = express();

    app.listen(port, () => {
        console.log(`listening on port: ${port}`);
    });
    return app;
}

export = {
    createServer,
};