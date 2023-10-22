import type { ListConfig } from "@keystone-6/core";
import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { text } from "@keystone-6/core/fields";



// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const UserTable: ListConfig<Lists.User.TypeInfo<any>, any> = list({
    access: allowAll,
    fields: {
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
        // ssoId: text({
        //     validation: { isRequired: false },
        //     isIndexed: "unique",
        // }),
        // // "checkbox" is keystone's weird way of saying "boolean field"
        // admin: checkbox({
        //     defaultValue: false,
        // }),
        // events: relationship({
        //     ref: "Event",
        // }),
    },
});
