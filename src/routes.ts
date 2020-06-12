import express from "express";
import UserController from "./Controllers/UserController";
import EstablishmentsController from "./Controllers/EstablishmentsController";
import ProductsController from "./Controllers/ProductsController";
import RequestsController from "./Controllers/RequestsController";

import multer from "multer";
import multerConfig from "./config/multer";

const upload = multer(multerConfig);
const routes = express.Router();

const userController = new UserController();
const establishmentsController = new EstablishmentsController();
const productsController = new ProductsController();
const requestsController = new RequestsController();

routes.post("/users", userController.store);
routes.post("/users/session", userController.session);
routes.get("/users/profile", userController.profile);

routes.get("/establishments", establishmentsController.index);
routes.post("/establishments", establishmentsController.store);
routes.post("/establishments/session", establishmentsController.session);

routes.get("/products", productsController.index);
routes.get("/products/:id", productsController.show);
routes.post("/products", upload.single("image"), productsController.store);

routes.get("/requests", requestsController.index);
routes.post("/requests", requestsController.store);

export default routes;
