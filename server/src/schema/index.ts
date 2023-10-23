import type { Lists } from ".keystone/types";

import { Decoration } from "./Decoration";
import { Entertainment } from "./Entertainment";
import { Event } from "./Event";
import { Food } from "./Food";
import { Guest } from "./Guest";
import { User } from "./User";



export const lists = {
    User,
    Event,
    Guest,
    Decoration,
    Entertainment,
    Food,
} as Lists;
