import type { User } from "better-auth";

declare module "h3" {
  // eslint-disable-next-line ts/consistent-type-definitions
  interface H3EventContext {
    user?: User;
  }
}

export type LatLongItem = {
  lat: number;
  lng: number;
};

export type MapPoint = {
  id: number;
  name: string;
  discription: string | null;
} & LatLongItem;
