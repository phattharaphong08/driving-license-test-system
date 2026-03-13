import { Router } from "express";

import { handlerAddDriving, hanwdlerGetDataAll, handleGetDataById, handlerUpdateData, handleDeleteData } from "../controllers/drivingLicense.controller.js";

const routerDriving = Router();

routerDriving.post("/driving-license", handlerAddDriving);
routerDriving.get("/driving-license", hanwdlerGetDataAll);

routerDriving.get("/driving-license/:id", handleGetDataById);
routerDriving.put("/driving-license/:id", handlerUpdateData);

routerDriving.delete("/driving-license/:id", handleDeleteData);

export default routerDriving;