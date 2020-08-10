import { NextApiRequest, NextApiResponse } from "next";
import { getRepository } from "typeorm/index";
import { ensureConnection } from "@/utils/ensureConnection";
import crypto from "crypto";
import { hashPassword } from "@/utils/hashPassword";
import { User } from "@/entities/User";
import jwt from "jsonwebtoken";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await ensureConnection();

  if (req.method == "POST") {
    const {
      body: { email, password },
    } = req;
    const salt = crypto.randomBytes(128).toString("base64");
    const hash = (await hashPassword(password, salt)).toString("hex");

    let user = new User();
    user.email = email;
    user.passwordHash = hash;
    user.salt = salt;
    let usersRepository = await getRepository(User);
    await usersRepository.save(user);

    const jwtKey = "my_secret_key";
    const jwtExpirySeconds = 60 * 10;
    const token = jwt.sign({ userId: user.id }, jwtKey, {
      algorithm: "HS256",
      expiresIn: jwtExpirySeconds,
    });

    res.setHeader(
      "Set-Cookie",
      `auth_token=${token}; Max-Age=${jwtExpirySeconds * 1000}`
    );

    res.status(200).json({ user });
    return;
  } else {
    res.status(200).json(await getRepository(User).find());
  }
};
