"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const axios_1 = __importDefault(require("axios"));
const zod_1 = __importDefault(require("zod"));
const redis_1 = require("redis");
const app = (0, express_1.default)();
const port = 5000;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const urlSchema = zod_1.default.string().url();
const urlsSchema = zod_1.default.array(urlSchema);
const client = (0, redis_1.createClient)();
client.on('error', (err) => console.log('Redis Client Error', err));
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield client.connect();
    console.log('Connected to Redis');
}))();
function checkStatus(_a) {
    return __awaiter(this, arguments, void 0, function* ({ url }) {
        var _b;
        try {
            const startTime = Date.now();
            const response = yield axios_1.default.get(url);
            const responseTime = Date.now() - startTime;
            return {
                url,
                status: 'UP',
                code: response.status,
                responseTime,
                lastChecked: new Date().toISOString()
            };
        }
        catch (error) {
            return {
                url,
                status: 'DOWN',
                code: ((_b = error.response) === null || _b === void 0 ? void 0 : _b.status) || "N/A",
                responseTime: 0,
                lastChecked: new Date().toISOString()
            };
        }
    });
}
app.post('/health', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        const urls = data.urls;
        urlsSchema.parse(urls);
        const results = yield Promise.all(urls.map((url) => __awaiter(void 0, void 0, void 0, function* () {
            const cachedResult = yield client.get(url);
            if (cachedResult) {
                return JSON.parse(cachedResult);
            }
            yield client.set(url, JSON.stringify({ url, status: 'processing' }), { EX: 60 }); // 60 seconds
            const result = yield checkStatus({ url });
            yield client.set(url, JSON.stringify(result), { EX: 60 }); // 60 seconds
            return result;
        })));
        res.json({
            status: 'success',
            data: results
        });
    }
    catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.errors || error.message || error
        });
    }
}));
app.post('/health/single', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        const url = data.url;
        urlSchema.parse(url);
        const isCached = yield client.get(url);
        if (isCached) {
            res.json({
                status: 'success',
                data: JSON.parse(isCached)
            });
            return;
        }
        const result = yield checkStatus({ url });
        yield client.set(url, JSON.stringify(result), { EX: 60 }); // 60 seconds
        res.json({
            status: 'success',
            data: result
        });
    }
    catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.errors || error.message || error
        });
    }
}));
app.get('/health/history', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const url = req.query.url;
    try {
        urlSchema.parse(url);
        const history = yield client.lRange(`status:${url}`, 0, -1);
        res.json({
            status: 'success',
            data: history.map((h) => JSON.parse(h))
        });
    }
    catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.errors || error.message || error
        });
    }
}));
app.listen(port, () => console.log(`Server is running on port: ${port}`));
