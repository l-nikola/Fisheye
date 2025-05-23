import { ImageMedia } from "../models/media.js";
import { VideoMedia } from "../models/media.js";

// Factory pour Media
export class MediaFactory {
  static create(data) {
    if (data.image) {
      return new ImageMedia(data);
    } else if (data.video) {
      return new VideoMedia(data);
    } else {
      throw "Type de média inconnu";
    }
  }
}
