// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import { getRepository } from "typeorm/index";
import { ensureConnection } from "@/utils/ensureConnection";
import { DBTestEntity } from "@/entities/DBTestEntity";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await ensureConnection();
  let repository = getRepository(DBTestEntity);
  let dbTestEntities = await repository.find();
  res.status(200).json({ name: "John Doe", dbTestEntities });
};
