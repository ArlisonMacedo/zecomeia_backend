import Knex from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("establishments", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("email").notNullable();
    table.string("endereco").notNullable();
    table.string("city").notNullable();
    table.string("uf", 2).notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("establishments");
}
