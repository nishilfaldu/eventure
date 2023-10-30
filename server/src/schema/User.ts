import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { relationship, text } from "@keystone-6/core/fields";



export const User = list({
    access: allowAll,
    fields: {
        // fields unique to the user table
        firstName: text({
            validation: { isRequired: false },
            db: { isNullable: true },
        }),
        lastName: text({
            validation: { isRequired: false },
            db: { isNullable: true },
        }),
        email: text({
            validation: { isRequired: true },
            db: { isNullable: false },
            isIndexed: "unique",
        }),
        country: text({
            validation: { isRequired: false },
            db: { isNullable: false },
        }),
        phoneNumber: text({
            db: { isNullable: false },
            validation: { isRequired: true },
        }),

        // relationships
        events: relationship({
            ref: "Event.user",
            many: true,
        }),

        // ssoId: text({
        //     validation: { isRequired: false },
        //     isIndexed: "unique",
        // }),
        // // "checkbox" is keystone's weird way of saying "boolean field"
        // admin: checkbox({
        //     defaultValue: false,
        // }),

    },
});
