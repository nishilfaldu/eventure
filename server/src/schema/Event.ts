import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { text, timestamp } from "@keystone-6/core/fields";



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
        // guests: relationship({
        //     ref: "Guest",
        // }),
        // decorations: relationship({
        //     ref: "Decoration",
        // }),
        // entertainment: relationship({
        //     ref: "Entertainment",
        // }),
        // food: relationship({
        //     ref: "Food",
        // }),
        // supplies: relationship({
        //     ref: "Supply",
        // }),
        // favors: relationship({
        //     ref: "Favor",
        // }),
        // clean: relationship({
        //     ref: "Clean",
        // }),
    },
});
