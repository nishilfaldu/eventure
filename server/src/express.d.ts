import type { BaseKeystoneTypeInfo, KeystoneContext } from "@keystone-6/core/types";



declare global {
    namespace Express {
        interface Request {
            keystoneContext: KeystoneContext<BaseKeystoneTypeInfo>;
        }
    }
}
