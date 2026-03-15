const musicModel = require("../models/music.model");
const albumModel = require("../models/album.model");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { uploadFile } = require("../services/storage.service");

async function createMusic(req, res) {
  const { title } = req.body;
 
  const musicFile = req.files?.music?.[0];
  const thumbnailFile = req.files?.thumbnailImage?.[0];


  if (!musicFile) {
    return res.status(400).json({ message: "Music file is required" });
  }

  const musicResult = await uploadFile(musicFile.buffer.toString("base64"));
  
  let thumbnailUrl = null;
  if (thumbnailFile) {

    const thumbnailResult = await uploadFile(thumbnailFile.buffer.toString("base64"));
    thumbnailUrl = thumbnailResult.url;
  }

  const music = await musicModel.create({
    title,
    uri: musicResult.url,
    artist: req.user?.id,
    thumbnailImage: thumbnailUrl
  });

  return res.status(201).json({
    message: "New Music Added Successfully",
    music: music,
  });
}
async function createAlbum(req, res) {
  const { title, musics } = req.body;
  const album = await albumModel.create({
    title,
    musics: musics,
    artist: req.user.id,
  });
  return res.status(201).json({
    message: "New Music Added Successfully",
    album: album,
  });
}
async function getAllMusic(req, res) {
  //    const musics=await musicModel.find();->gived id
  //  const musics=await musicModel.find().populate("artist","userName email");-> all data is passed in it

  // Now applying limits

  const musics = await musicModel
    .find()
    // .skip(1)
    .limit()
    .populate("artist", "userName email");
  res.status(200).json({
    message: "Music fetched successfully",
    list: musics,
  });
}
async function getAllAlbum(req, res) {
  const albums = await albumModel
    .find()
    .select("title artists")
    .populate("artist", "userName email");
  res.status(200).json({
    message: "Music fetched successfully",
    list: albums,
  });
}
async function getAlbumById(req, res) {
  const albumId = req.params.albumId;
  const album = await albumModel
    .findById(albumId)
    .populate("artist", "userName email")
    .populate("musics");
  return res.status(200).json({
    message: "Album fetched Succesfully",
    album: album,
  });
}
async function likeMusic(req, res) {
  const musicId = req.params.musicId;
  const music = await musicModel.findById(musicId);
  if (!music) {
    return res.status(404).json({ message: "Music not found" });
  }
  
  const user = await userModel.findById(req.user.id);
  if (!user.likedMusic.includes(musicId)) {
    user.likedMusic.push(musicId);
    await user.save();
  }
  
  return res.status(200).json({
    message: "Music liked successfully",
    music: music,
  });
}
async function unlikeMusic(req, res) {
  const musicId = req.params.musicId;
  const music = await musicModel.findById(musicId);
  if (!music) {
    return res.status(404).json({ message: "Music not found" });
  }
  
  const user = await userModel.findById(req.user.id);
  if (user.likedMusic.includes(musicId)) {
    user.likedMusic.pull(musicId);
    await user.save();
  }
  
  return res.status(200).json({
    message: "Music unliked successfully",
    music: music,
  });
}
async function getLikedMusic(req, res) {
  const user = await userModel.findById(req.user.id);
  const musics = await musicModel.find({ _id: { $in: user.likedMusic } }).populate("artist", "userName email");
  return res.status(200).json({
    message: "Liked music fetched successfully",
    list: musics,
  });
}

module.exports = {
  createMusic,
  createAlbum,
  getAllMusic,
  getAllAlbum,
  getAlbumById,
  likeMusic,
  unlikeMusic,
  getLikedMusic
};
