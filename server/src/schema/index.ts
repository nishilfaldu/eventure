import type { Lists } from ".keystone/types";

import { Clean } from "./Clean";
import { Decoration } from "./Decoration";
import { Entertainment } from "./Entertainment";
import { Event } from "./Event";
import { Favors } from "./Favors";
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
    Favors,
    Clean,
} as Lists;
