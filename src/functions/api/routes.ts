import { Router } from "express";

import { ScrapperController } from "../../controllers/scrapper.controller";
import { StoreRepository } from "../../db/repositories/store";

import { PrismaClient } from "@prisma/client";

const controller = new ScrapperController(
  new StoreRepository(new PrismaClient())
);

const router = Router();

router.get("/", (req, res) => {
  console.log("hello");

  return res.status(200).json({
    success: true,
  });
});

router.post("/", controller.run.bind(controller));

export { router };
