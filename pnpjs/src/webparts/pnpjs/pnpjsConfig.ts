import { WebPartContext } from "@microsoft/sp-webpart-base";

// import pnp and pnp logging system
import {spfi, SPFI, SPFx } from '@pnp/sp';
import { LogLevel, PnPLogging } from '@pnp/logging';
import '@pnp/sp/webs';
import '@pnp/sp/lists';
import "@pnp/sp/items";
import "@pnp/sp/batching";

var _sp: SPFI | null = null;

export const getSP = (context?: WebPartContext): SPFI => {
    if(context != null) {
        // Must add the @pnp/logging package to include the PnPLogging behavior as it is no longer a peer dependency
        // The Loglevel set's at what level a message will be written to the console
        _sp = spfi().using(SPFx(context)).using(PnPLogging(LogLevel.Warning));
    }
    return _sp!; // The exclamation mark in typescript tells the compiler to trust that _sp will not be null at this line in the code
}