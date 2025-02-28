import { randomUUID } from "crypto";
import { IDEntityUUIDInvalid } from "./domain.exception";

const isEntity = (v: any): v is Entity<any> => {
  return v instanceof Entity;
};

abstract class Entity<T> {
  private _id: string;

  constructor(id?: string) {
    this.id = id ? id : randomUUID();
  }

  public get id(): string {
    return this._id;
  }

  private set id(value: string) {
    if (!Entity.validUUID(value)) {
      throw new IDEntityUUIDInvalid();
    }

    this._id = value;
  }

  public equals(object?: Entity<T>): boolean {
    if (object == null || object == undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!isEntity(object)) {
      return false;
    }

    return this._id == object._id;
  }

  public static validUUID(UUID: string): boolean {
    let defaultUUID: RegExp =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return defaultUUID.test(UUID);
  }
}

export { Entity };
