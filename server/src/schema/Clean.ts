import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { checkbox } from "@keystone-6/core/fields";



export const Clean = list({
    access: allowAll,
    fields: {
        // fields unique to the guest table
        trashBags: checkbox({
            defaultValue: false,
        }),
        supplies: checkbox({
            defaultValue: false,
        }),
        recycle: checkbox({
            defaultValue: false,
        }),
        containers: checkbox({
            defaultValue: false,
        }),

        // relationships
        // event: relationship({
        //     ref: "Event", many: false,
        // }),
    },
});
