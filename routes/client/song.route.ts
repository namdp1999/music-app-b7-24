import express from "express";
const router = express.Router();

import * as controller from "../../controllers/client/song.controller";

router.get("/:slugTopic", controller.index);

router.get("/detail/:slugSong", controller.detail);

export const songsRoute = router;