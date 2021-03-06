import path from "path";

module.exports = {
  client: "sqlite",
  connection: {
    filename: path.resolve(
      __dirname,
      "dist",
      "src",
      "database",
      "database.sqlite"
    ),
  },
  migrations: {
    directory: path.resolve(__dirname, "dist", "src", "database", "migrations"),
  },

  useNullAsDefault: true,
};
