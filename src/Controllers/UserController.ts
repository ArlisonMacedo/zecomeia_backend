import { Request, Response } from "express";
import knex from "../database/connection";

class UserController {
  async store(request: Request, response: Response) {
    const { name, email, endereco, city, uf } = request.body;

    const user = await knex("users").insert({
      name,
      email,
      endereco,
      city,
      uf,
    });

    const id = user[0];

    return response.json(id);
  }

  async session(request: Request, response: Response) {
    const { id } = request.body;

    const user = await knex("users").where("id", id).select("*").first();

    if (!user) {
      return response.json({ erro: "User not Found" });
    }

    return response.json(user);
  }

  async profile(request: Request, response: Response) {
    const id = request.headers.authorization;

    const user = await knex("users")
      .where("id", String(id))
      .select("*")
      .first();

    return response.json(user);
  }
}

export default UserController;
