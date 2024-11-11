import { Request, Response } from "express";
import { Topic } from "../../models/topic.model";
import { Song } from "../../models/song.model";
import { Singer } from "../../models/singer.model";

export const index = async (req: Request, res: Response) => {
  const slugTopic: string = req.params.slugTopic;

  const topic = await Topic.findOne({
    slug: slugTopic,
    deleted: false,
    status: "active"
  });

  const songs = await Song.find({
    topicId: topic.id,
    deleted: false,
    status: "active"
  }).select("id title avatar singerId like slug");

  for (const song of songs) {
    const infoSinger = await Singer.findOne({
      _id: song.singerId,
      deleted: false
    });

    song["singerFullName"] = infoSinger ? infoSinger.fullName : "";
  }

  res.render("client/pages/songs/index", {
    pageTitle: topic.title,
    songs: songs
  });
}

export const detail = async (req: Request, res: Response) => {
  const slugSong = req.params.slugSong;

  const song = await Song.findOne({
    slug: slugSong,
    deleted: false,
    status: "active"
  });

  const singer = await Singer.findOne({
    _id: song.singerId
  }).select("fullName");

  const topic = await Topic.findOne({
    _id: song.topicId
  }).select("title");

  res.render("client/pages/songs/detail", {
    pageTitle: "Chi tiết bài hát",
    song: song,
    singer: singer,
    topic: topic
  });
}