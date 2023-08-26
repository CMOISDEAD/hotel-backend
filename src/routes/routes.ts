import { PrismaClient } from "@prisma/client";
import { Request, Response, Router } from "express";
import { parseBoolean } from "../utils";

const prisma = new PrismaClient();
const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

// save room on collection
router.post("/rooms", async (req: Request, res: Response) => {
  const data = req.body;
  const room = {
    ...data,
    beds: {},
    number: parseInt(data.number),
    price: parseInt(data.price),
    aviable: parseBoolean(data.aviable),
  };
  await prisma.rooms.create({ data: room });
  res.status(200).send("ok");
});

// update a room on the collection
router.put("/rooms/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  delete data.id;
  delete data.reservations;
  delete data.beds;
  const room = {
    ...data,
  };
  await prisma.rooms.update({ where: { id: id }, data: room });
  res.status(200).send("ok");
});

// get all rooms on the collection
router.get("/rooms", async (req: Request, res: Response) => {
  const rooms = await prisma.rooms.findMany();
  res.json(rooms);
});

// get a room by id
router.get("/rooms/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const room = await prisma.rooms.findUnique({
    where: { id: id },
    include: { beds: true },
  });
  res.json(room);
});

// remove a room from the collection by id
router.delete("/rooms/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.rooms.delete({ where: { id: id } });
  res.status(200).send("ok");
});

// save bed on the collection
router.post("/beds", async (req: Request, res: Response) => {
  const data = req.body;
  const bed = {
    ...data,
    aviable: parseBoolean(data.aviable),
  };
  await prisma.beds.create({ data: bed });
  res.status(200).send("ok");
});

// get all beds on the collection
router.get("/beds", async (req: Request, res: Response) => {
  const beds = await prisma.beds.findMany();
  res.json(beds);
});

// remove a bed from the collection by id
router.delete("/beds/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.beds.delete({ where: { id: id } });
  res.status(200).send("ok");
});

// save a reservation on the collection
router.post("/reservations", async (req: Request, res: Response) => {
  const reservation = req.body;
  const newReservation = await prisma.reservations.create({
    data: reservation,
  });
  await prisma.rooms.update({
    where: { id: newReservation.roomId },
    data: {
      aviable: false,
      status: "ocupado",
    },
  });
  await prisma.beds.updateMany({
    where: { roomId: newReservation.roomId },
    data: {
      aviable: false,
      status: "ocupado",
    },
  });
  res.status(200).send("ok");
});

// get all reservations on the collection
router.get("/reservations", async (req: Request, res: Response) => {
  const reservations = await prisma.reservations.findMany();
  res.json(reservations);
});

// get reservation by id
router.get("/reservations/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const reservation = await prisma.reservations.findUnique({
    where: { id: id },
    include: {
      room: true,
      user: true,
    },
  });
  res.json(reservation);
});

// update a reservation on the collection
router.put("/reservation/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  delete data.id;
  delete data.room;
  delete data.user;
  const reservation = {
    ...data,
  };
  await prisma.reservations.update({ where: { id: id }, data: reservation });
  res.status(200).send("ok");
});

// remove a reservation from the collection by id and update the room status
router.delete("/reservations/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const reservation = await prisma.reservations.delete({ where: { id: id } });
  await prisma.rooms.update({
    where: { id: reservation.roomId },
    data: {
      aviable: true,
      status: "disponible",
    },
  });
  await prisma.beds.updateMany({
    where: { roomId: reservation.roomId },
    data: {
      aviable: true,
      status: "disponible",
    },
  });
  res.status(200).send("ok");
});

// save a user on the collection
router.post("/users", async (req: Request, res: Response) => {
  const data = req.body;
  const user = {
    ...data,
    reservations: {},
  };
  await prisma.users.create({ data: user });
  res.status(200).send("ok");
});

// update a user on the collection
router.put("/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  delete data.id;
  delete data.reservations;
  const user = {
    ...data,
  };
  await prisma.users.update({ where: { id: id }, data: user });
  res.status(200).send("ok");
});

// get all users on the collection
router.get("/users", async (req: Request, res: Response) => {
  const users = await prisma.users.findMany();
  res.json(users);
});

// get user by id
router.get("/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await prisma.users.findUnique({
    where: { id: id },
    include: {
      reservations: {
        include: { room: true },
      },
    },
  });
  res.json(user);
});

// remove a user from the collection by id
router.delete("/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.users.delete({ where: { id: id } });
  res.status(200).send("ok");
});

// get all data on the collection
router.get("/all", async (req: Request, res: Response) => {
  const beds = await prisma.beds.findMany({ include: { room: true } });
  const users = await prisma.users.findMany({
    include: { reservations: true },
  });
  const rooms = await prisma.rooms.findMany({
    include: {
      beds: true,
      reservations: {
        include: { user: true },
      },
    },
  });
  const reservations = await prisma.reservations.findMany({
    include: { user: true, room: true },
  });

  res.json({ users, reservations, beds, rooms });
});

export default router;
