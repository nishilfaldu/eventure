import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { relationship, text } from "@keystone-6/core/fields";



export const Guest = list({
    access: allowAll,
    fields: {
        // fields unique to the guest table
        name: text({
            validation: { isRequired: true },
            db: { isNullable: false },
        }),
        email: text({
            validation: { isRequired: true },
            db: { isNullable: false },
        }),
        phoneNumber: text({
            validation: { isRequired: true },
            db: { isNullable: false },
        }),

        // relationships
        event: relationship({
            ref: "Event.guests",
            many: false,
        }),
    },
});
