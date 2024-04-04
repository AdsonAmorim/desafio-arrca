import { PrismaClient } from "@prisma/client";
import { StoreRepository } from "../../db/repositories/store";
import { ScrapperJob } from "./cronjob";

const scrapperJob = new ScrapperJob(new StoreRepository(new PrismaClient()));

const handler = scrapperJob.run.bind(scrapperJob);

export { handler };
