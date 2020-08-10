// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import { getRepository } from "typeorm/index";
import { ensureConnection } from "@/utils/ensureConnection";
import { DBTestEntity } from "@/entities/DBTestEntity";
import jwt from "jsonwebtoken";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await ensureConnection();
  let repository = getRepository(DBTestEntity);
  let dbTestEntities = await repository.find();

  const jwtKey = "my_secret_key";
  const jwtExpirySeconds = 300;
  const token = jwt.sign({ username: "kmp" }, jwtKey, {
    algorithm: "HS256",
    expiresIn: jwtExpirySeconds,
  });

  res.setHeader(
    "Set-Cookie",
    `auth_token=${token}; Max-Age=${jwtExpirySeconds * 1000}`
  );

  res.status(200).json({ dbTestEntities, token });
};
