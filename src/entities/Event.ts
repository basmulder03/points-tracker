import {Team} from "./Team.ts";
import {Part} from "./Part.ts";
import {Point} from "./Point.ts";

export type Event = {
    name: string;
    teams: Team[];
    parts: Part[];
    points: Point[];
}