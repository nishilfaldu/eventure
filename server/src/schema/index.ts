import type { Lists } from ".keystone/types";
import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import {
    text,
    checkbox,
} from "@keystone-6/core/fields";



export const lists: Lists = {
    User: list({
        access: allowAll,
        fields: {
            name: text({ validation: { isRequired: true } }),
            ssoId: text({
                validation: { isRequired: false },
                isIndexed: "unique",
            }),
            email: text({
                validation: { isRequired: true },
                isIndexed: "unique",
            }),

            // "checkbox" is keystone's weird way of saying "boolean field"
            admin: checkbox({
                defaultValue: false,
            }),
        },
    }),
};
