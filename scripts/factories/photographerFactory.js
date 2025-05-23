import { Photographer } from "../models/photographer.js";

// Factory pour Photographe
export class PhotographerFactory {
  static create(data) {
    return new Photographer(data);
  }
}
