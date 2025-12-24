import type { User } from "better-auth";
import type { RouteLocationRaw } from "vue-router";

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
  to?: RouteLocationRaw;
  toLebal?: string;
} & LatLongItem;
