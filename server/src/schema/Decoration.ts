import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { checkbox, text } from "@keystone-6/core/fields";



export const Decoration = list({
    access: allowAll,
    fields: {
        // fields unique to the decoration table
        balloons: checkbox({
            defaultValue: false,
        }),
        posters: checkbox({
            defaultValue: false,
        }),
        tableDecorations: checkbox({
            defaultValue: false,
        }),
        wallDecorations: checkbox({
            defaultValue: false,
        }),
        lights: checkbox({
            defaultValue: false,
        }),
        personalizedTouches: text({
            validation: { isRequired: false },
            db: { isNullable: true },
        }),

        // relationships
        // event: relationship({
        //     ref: "Event", many: false,
        // }),
    },
});
