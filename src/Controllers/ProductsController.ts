import knex from "../database/connection";

import { Request, Response } from "express";

class ProductsController {
  async index(request: Request, response: Response) {
    const products = await knex("products").distinct().select("*");

    const seralizedProducts = products.map((product) => {
      return {
        ...product,
        image_url: `https://powerful-harbor-68671.herokuapp.com/uploads/${product.image}`,
      };
    });

    return response.json(seralizedProducts);
    // console.log(seralizedProducts);
  }
  async store(request: Request, response: Response) {
    const id = request.headers.authorization;
    const { nameProduct, price, amount } = request.body;

    const estabId = await knex("establishments")
      .where("id", String(id))
      .select("*")
      .first();

    if (!estabId) {
      return response.json({ msg: "Establishment not found!!!" });
    }

    const establishment_id = Number(estabId.id);

    const product = await knex("Products").insert({
      nameProduct,
      image: request.file.filename,
      price,
      amount,
      establishment_id,
    });

    return response.json(product);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;
    const product = await knex("products").where("id", id).first();

    const seralizedProduct = {
      ...product,
      image_url: `https://powerful-harbor-68671.herokuapp.com/uploads/${product.image}`,
    };

    // const showProduct = await knex("products").select("*")

    return response.json({ product: seralizedProduct });
  }
}

export default ProductsController;
