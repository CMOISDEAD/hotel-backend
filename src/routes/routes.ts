import { PrismaClient } from "@prisma/client";
import { Request, Response, Router } from "express";

const router = Router();
const prisma = new PrismaClient();

router.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

router.post("/rooms", async (req: Request, res: Response) => {
  const { room } = req.body;
  await prisma.rooms.create({ data: room });
  res.status(200).send("ok");
});

router.get("/rooms", async (req: Request, res: Response) => {
  const rooms = await prisma.rooms.findMany();
  res.json(rooms);
});

router.post("/beds", async (req: Request, res: Response) => {
  const { bed } = req.body;
  await prisma.beds.create({ data: bed });
  res.status(200).send("ok");
});

router.get("/beds", async (req: Request, res: Response) => {
  const beds = await prisma.beds.findMany();
  res.json(beds);
});

router.post("/reservations", async (req: Request, res: Response) => {
  const { reservations } = req.body;
  await prisma.reservations.create({ data: reservations });
  res.status(200).send("ok");
});

router.get("/reservations", async (req: Request, res: Response) => {
  const reservations = await prisma.reservations.findMany();
  res.json(reservations);
});

router.post("/users", async (req: Request, res: Response) => {
  const { user } = req.body;
  await prisma.users.create({ data: user });
  res.status(200).send("ok");
});

router.get("/users", async (req: Request, res: Response) => {
  const users = await prisma.users.findMany();
  res.json(users);
});

export default router;
