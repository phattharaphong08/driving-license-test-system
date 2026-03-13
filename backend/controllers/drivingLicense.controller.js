import { drivingModel } from "../models/driving.model.js";



export const handlerAddDriving = async (req, res) => {
    try {
        const dataAdd = await req.body;

        await drivingModel.create(dataAdd);

        res.json({ message: "Saved successfully" });
    } catch (err) {
        res.status(500).json(err);
    };
};

export const hanwdlerGetDataAll = async (req, res) => {
    try {
        const data = await drivingModel.findAll();

        res.json(data);
    } catch (err) {
        res.status(500).json(err);
    };
};

export const handleGetDataById = async (req, res) => {
    try {
        const id = req.params.id;
        // console.log(id)

        const result = await drivingModel.findById(id);
        // console.log(result)
        res.json(result);

    } catch (err) {
        res.status(500).json(err);
    };
};

export const handlerUpdateData = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;

        await drivingModel.update(id, data);

        res.json({ message: "Saved successfully" });

    } catch (err) {
        res.status(500).json(err);
    };
};

export const handleDeleteData = async (req, res) => {
    try {

        const id = req.params.id;

        await drivingModel.delete(id);
        res.json({ message: "Delete success" });
    } catch (err) {
        res.status(500).json(err);
    };
};