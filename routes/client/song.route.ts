import express from "express";
const router = express.Router();

import * as controller from "../../controllers/client/song.controller";

router.get("/detail/:slugSong", controller.detail);

router.patch("/like", controller.likePatch);

router.patch("/favorite", controller.favoritePatch);

router.get("/favorite", controller.favorite);

router.get("/search/result", controller.search);

router.get("/:slugTopic", controller.index);

export const songsRoute = router;