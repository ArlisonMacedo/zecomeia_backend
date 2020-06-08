import Knex from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("products", (table) => {
    table.increments("id").primary();
    table.string("nameProduct").notNullable();
    table.string("image").notNullable();
    table.decimal("price").notNullable();
    table.decimal("amount").notNullable();

    table
      .integer("establishment_id")
      .notNullable()
      .references("id")
      .inTable("establishments");
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("products");
}
