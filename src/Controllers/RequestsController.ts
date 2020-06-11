import knex from "../database/connection";
import { Request, Response } from "express";

class RequestsController {
  async index(request: Request, response: Response) {
    const user_id = request.headers.authorization;

    const user = await knex("users")
      .where("id", String(user_id))
      .select("*")
      .first();

    if (!user) {
      return response.json({ msg: "User not Found" });
    }
    // SELECT * from users INNER JOIN
    // requests on user_id = requests.user_id
    // const requestsUsers = await knex("users")
    //   .innerJoin("requests", "user_id", "=", "requests.product_id")
    //   .where("user_id", String(user_id))
    //   .distinct()
    //   .select("requests.*");

    // const Prodid = requestsUsers.map((prodId) => prodId.user_id);

    // // console.log(Prodid);

    // const parsedProdid = String(Prodid)
    //   .split(",")
    //   .map((prodid) => Number(prodid.trim()));
    // console.log(parsedProdid);

    // console.log(user_id);

    const seralizedReqUser = await knex
      .select("*")
      .from("products")
      .join("requests", { "requests.product_id": "products.id" })
      .where("requests.user_id", user.id);

    // console.log({ seralizedReqUser });

    const seralizedReqProduct = seralizedReqUser.map((reqUser) => {
      return {
        ...reqUser,
        image_url: `http://3.20.240.35:3333/uploads/${reqUser.image}`,
      };
    });

    return response.json(seralizedReqProduct);
  }

  async store(request: Request, response: Response) {
    const user_id = request.headers.authorization;

    const { product_id } = request.body;

    const prodId = await knex("products")
      .where("id", String(product_id))
      .select("*")
      .first();

    if (!prodId) {
      // console.log(prodId);
      return response.json({ msg: "Product not found" });
    }

    const buyRequest = await knex("requests").insert({
      user_id,
      product_id,
    });

    return response.json(buyRequest);
  }
}

export default RequestsController;
