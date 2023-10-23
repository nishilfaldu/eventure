import type { Lists } from ".keystone/types";

import { Decoration } from "./Decoration";
import { Entertainment } from "./Entertainment";
import { Event } from "./Event";
import { Food } from "./Food";
import { Guest } from "./Guest";
import { Supplies } from "./Supplies";
import { User } from "./User";



export const lists = {
    User,
    Event,
    Guest,
    Decoration,
    Entertainment,
    Food,
    Supplies,
} as Lists;
