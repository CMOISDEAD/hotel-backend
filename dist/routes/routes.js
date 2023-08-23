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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = require("express");
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
router.get("/", (req, res) => {
    res.send("Hello World!");
});
router.post("/rooms", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const { room } = req.body;
    const room = {
        number: 2,
        description: "test 2",
        capacity: 2,
        price: 100,
        image: "image",
        status: "available",
        aviable: true,
        beds: {},
    };
    yield prisma.rooms.create({ data: room });
    res.status(200).send("ok");
}));
router.get("/rooms", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const rooms = yield prisma.rooms.findMany();
    res.json(rooms);
}));
router.post("/beds", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bed } = req.body;
    yield prisma.beds.create(bed);
}));
router.get("/beds", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const beds = yield prisma.beds.findMany();
    res.json(beds);
}));
exports.default = router;
