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
const utils_1 = require("../utils");
const prisma = new client_1.PrismaClient();
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    res.send("Hello World!");
});
// save room on collection
router.post("/rooms", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const room = Object.assign(Object.assign({}, data), { beds: {}, number: parseInt(data.number), price: parseInt(data.price), aviable: (0, utils_1.parseBoolean)(data.aviable) });
    yield prisma.rooms.create({ data: room });
    res.status(200).send("ok");
}));
// get all rooms on the collection
router.get("/rooms", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const rooms = yield prisma.rooms.findMany();
    res.json(rooms);
}));
// get a room by id
router.get("/rooms/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const room = yield prisma.rooms.findUnique({
        where: { id: id },
        include: { beds: true },
    });
    res.json(room);
}));
// remove a room from the collection by id
router.delete("/rooms/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield prisma.rooms.delete({ where: { id: id } });
    res.status(200).send("ok");
}));
// save bed on the collection
router.post("/beds", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const bed = Object.assign(Object.assign({}, data), { aviable: (0, utils_1.parseBoolean)(data.aviable) });
    yield prisma.beds.create({ data: bed });
    res.status(200).send("ok");
}));
// get all beds on the collection
router.get("/beds", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const beds = yield prisma.beds.findMany();
    res.json(beds);
}));
// remove a bed from the collection by id
router.delete("/beds/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield prisma.beds.delete({ where: { id: id } });
    res.status(200).send("ok");
}));
// save a reservation on the collection
router.post("/reservations", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reservation = req.body;
    const newReservation = yield prisma.reservations.create({
        data: reservation,
    });
    yield prisma.rooms.update({
        where: { id: newReservation.roomId },
        data: {
            aviable: false,
            status: "ocupado",
        },
    });
    res.status(200).send("ok");
}));
// get all reservations on the collection
router.get("/reservations", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reservations = yield prisma.reservations.findMany();
    res.json(reservations);
}));
// remove a reservation from the collection by id and update the room status
router.delete("/reservations/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const reservation = yield prisma.reservations.delete({ where: { id: id } });
    yield prisma.rooms.update({
        where: { id: reservation.roomId },
        data: {
            aviable: true,
            status: "disponible",
        },
    });
    res.status(200).send("ok");
}));
// save a user on the collection
router.post("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const user = Object.assign(Object.assign({}, data), { reservations: {} });
    yield prisma.users.create({ data: user });
    res.status(200).send("ok");
}));
// get all users on the collection
router.get("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield prisma.users.findMany();
    res.json(users);
}));
// remove a user from the collection by id
router.delete("/users/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield prisma.users.delete({ where: { id: id } });
    res.status(200).send("ok");
}));
// get all data on the collection
router.get("/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const beds = yield prisma.beds.findMany({ include: { room: true } });
    const users = yield prisma.users.findMany({
        include: { reservations: true },
    });
    const rooms = yield prisma.rooms.findMany({
        include: {
            beds: true,
            reservations: {
                include: { user: true },
            },
        },
    });
    const reservations = yield prisma.reservations.findMany({
        include: { user: true, room: true },
    });
    res.json({ users, reservations, beds, rooms });
}));
exports.default = router;
