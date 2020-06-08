import Knex from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("requests", (table) => {
    table.increments("id").primary();
    table
      .integer("product_id")
      .notNullable()
      .references("id")
      .inTable("products");
    table.integer("user_id").notNullable().references("id").inTable("users");
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("requests");
}
