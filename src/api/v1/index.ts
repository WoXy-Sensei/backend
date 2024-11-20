import express from 'express';
import fs from 'fs';
import path from 'path';

const version = path.basename(path.join(__dirname));

const router = express.Router();

function loadRoutes(dir: string, basePath: string = ''): void {
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            loadRoutes(filePath, path.join(basePath, file));
        } else if (file === 'routes.ts') {
            const routePath = path.join(basePath);
            const routerModule = require(filePath);
            router.use(`/${routePath}`, routerModule.default);
            console.log(`Route registered: /api/${version}/${routePath}`);
        }
    });
}

loadRoutes(path.join(__dirname));

router.get('/', (req, res) => {
    res.json({
        message: `API ${version} root route`,
    });
});

export default router;
