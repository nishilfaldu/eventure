import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { checkbox } from "@keystone-6/core/fields";



export const Supplies = list({
    access: allowAll,
    fields: {
        // fields unique to the supplies table
        utensils: checkbox({
            defaultValue: false,
        }),
        cupsAndStraws: checkbox({
            defaultValue: false,
        }),
        accessories: checkbox({
            defaultValue: false,
        }),
        candles: checkbox({
            defaultValue: false,
        }),
        cakeToppers: checkbox({
            defaultValue: false,
        }),

        // relationships
        // event: relationship({
        //     ref: "Event", many: false,
        // }),
    },
});
