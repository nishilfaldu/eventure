import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { relationship, text, timestamp } from "@keystone-6/core/fields";



export const Event = list({
    access: allowAll,
    fields: {
        // fields unique to the event table
        name: text({
            validation: { isRequired: true },
            db: { isNullable: false },
        }),
        type: text({
            validation: { isRequired: true },
            db: { isNullable: false },
        }),
        location: text({
            validation: { isRequired: false },
            db: { isNullable: true },
        }),
        date: timestamp({
            validation: { isRequired: true },
            db: { isNullable: false },
        }),

        // relationships
        user: relationship({
            ref: "User.events",
            many: false,
        }),
        guests: relationship({
            ref: "Guest.event",
            many: true,
        }),
        decorations: relationship({
            ref: "Decoration.event",
            many: false,
        }),
        entertainment: relationship({
            ref: "Entertainment.event",
            many: false,
        }),
        food: relationship({
            ref: "Food.event",
            many: false,
        }),
        essentials: relationship({
            ref: "Essential.event",
            many: false,
        }),
        favors: relationship({
            ref: "Favor.event",
            many: false,
        }),
        cleanup: relationship({
            ref: "Cleanup.event",
            many: false,
        }),
    },
});
