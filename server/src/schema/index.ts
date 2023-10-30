import type { Lists } from ".keystone/types";

import { Cleanup } from "./Cleanup";
import { Decoration } from "./Decoration";
import { Entertainment } from "./Entertainment";
import { Essential } from "./Essential";
import { Event } from "./Event";
import { Favor } from "./Favor";
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
    Essential,
    Favor,
    Cleanup,
} as Lists;
