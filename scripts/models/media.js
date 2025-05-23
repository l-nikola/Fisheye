// Classe Media
class Media {
  constructor(data) {
    this.id = data.id;
    this.photographerId = data.photographerId;
    this.title = data.title;
    this.likes = data.likes;
    this.date = data.date;
    this.price = data.price;
  }
}

// Classe Image
export class ImageMedia extends Media {
  constructor(data) {
    super(data);
    this.image = data.image;
    this.type = "image";
  }
}

// Classe Vidéo
export class VideoMedia extends Media {
  constructor(data) {
    super(data);
    this.video = data.video;
    this.type = "video";
  }
}
