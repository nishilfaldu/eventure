import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { checkbox, relationship } from "@keystone-6/core/fields";



export const Food = list({
    access: allowAll,
    fields: {
        // fields unique to the food table
        appetizers: checkbox({
            defaultValue: false,
        }),
        mainCourse: checkbox({
            defaultValue: false,
        }),
        beverages: checkbox({
            defaultValue: false,
        }),
        dessert: checkbox({
            defaultValue: false,
        }),
        cake: checkbox({
            defaultValue: false,
        }),

        // relationships
        event: relationship({
            ref: "Event.food",
            many: false,
            db: { foreignKey: true },
        }),
    },
});
