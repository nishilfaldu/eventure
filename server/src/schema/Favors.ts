import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { checkbox } from "@keystone-6/core/fields";



export const Favors = list({
    access: allowAll,
    fields: {
        // fields unique to the favors table
        goodyBags: checkbox({
            defaultValue: false,
        }),
        thankyouNote: checkbox({
            defaultValue: false,
        }),

        // relationships
        // event: relationship({
        //     ref: "Event", many: false,
        // }),
    },
});
