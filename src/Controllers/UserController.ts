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
}

export default UserController;
