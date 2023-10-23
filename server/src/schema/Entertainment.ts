import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { checkbox } from "@keystone-6/core/fields";



export const Entertainment = list({
    access: allowAll,
    fields: {
        // fields entertainment to the guest table
        music: checkbox({
            defaultValue: false,
        }),
        entertainers: checkbox({
            defaultValue: false,
        }),
        activities: checkbox({
            defaultValue: false,
        }),
        photobooth: checkbox({
            defaultValue: false,
        }),
        prizes: checkbox({
            defaultValue: false,
        }),

        // relationships
        // event: relationship({
        //     ref: "Event", many: false,
        // }),
    },
});
