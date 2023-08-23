import { PrismaClient } from "@prisma/client";
import { Express, Request, Response, Router } from "express";

const router = Router();
const prisma = new PrismaClient();

router.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

router.post("/rooms", async (req: Request, res: Response) => {
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
  await prisma.rooms.create({ data: room });
  res.status(200).send("ok");
});

router.get("/rooms", async (req: Request, res: Response) => {
  const rooms = await prisma.rooms.findMany();
  res.json(rooms);
});

router.post("/beds", async (req: Request, res: Response) => {
  const { bed } = req.body;
  await prisma.beds.create(bed);
});

router.get("/beds", async (req: Request, res: Response) => {
  const beds = await prisma.beds.findMany();
  res.json(beds);
});

export default router;
