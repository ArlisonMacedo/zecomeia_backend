import knex from "../database/connection";
import { Request, Response } from "express";

class EstablishmentsController {
  async index(request: Request, response: Response) {
    const { city } = request.query;

    const establishment = await knex("establishments")
      // .join("products", "establishment_id", "=", "products.establishment_id")
      .where("city", String(city))
      .select("establishments.*");
    // .first();

    return response.json(establishment);
  }

  async store(request: Request, response: Response) {
    const { name, email, endereco, city, uf } = request.body;

    const establishment = await knex("establishments").insert({
      name,
      email,
      endereco,
      city,
      uf,
    });

    return response.json(establishment);
  }

  async session(request: Request, response: Response) {
    const { id } = request.body;
    const user = await knex("establishments")
      .where("id", id)
      .select("*")
      .first();
    if (!user) {
      return response.json({ meg: "User not Found this is ID" });
    }
    return response.json(user);
  }
}

export default EstablishmentsController;
