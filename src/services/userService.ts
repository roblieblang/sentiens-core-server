import { Prisma } from "@prisma/client";
import prisma from "../utils/prisma";

export const createUserService = async (user: Prisma.UserCreateInput) => {
  return await prisma.user.create({
    data: user,
  });
};

export const poo = () =>{};
