import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { hashPassword } from "@/utils/hashPassword";
import { User } from "@/entities/User";
import { getRepository } from "typeorm/index";
import { ensureConnection } from "@/utils/ensureConnection";
import {constants} from "http2";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "POST") {
    await ensureConnection();
    const {
      body: { email, password },
    } = req;

    let usersRepository = await getRepository(User);
    const user = await usersRepository.findOneOrFail({ where: { email } });
    const passwordHash = (await hashPassword(password, user.salt)).toString(
      "hex"
    );
    if (passwordHash === user.passwordHash) {
      return res.status(200).json({ user });
    } else {
      return res.status(401).end();
    }
  } else {
    return res.status(constants.HTTP_STATUS_METHOD_NOT_ALLOWED.valueOf()).end();
  }
};
