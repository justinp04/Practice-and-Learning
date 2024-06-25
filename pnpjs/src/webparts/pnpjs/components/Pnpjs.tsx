import * as React from 'react';
import styles from './Pnpjs.module.scss';
import type { IPnpjsProps } from './IPnpjsProps';

// import interfaces
import { IFile, IResponseItem } from '../interfaces';

import { Caching } from "@pnp/queryable";
import { getSP } from "../pnpjsConfig";
import { SPFI, spfi } from "@pnp/sp";
import { Logger, LogLevel } from "@pnp/logging";
import { Label, PrimaryButton } from '@microsoft/office-ui-fabric-react-bundle';
import { Web } from '@pnp/sp/webs';
import '@pnp/sp/webs';
import '@pnp/sp/folders';
import '@pnp/sp/files/folder';

export interface IAsyncPnpjsProps {
    description: string;
}

export interface IPnpjsState {
    items: IFile[];
    errors: string[];
}

export default class Pnpjs extends React.Component<IPnpjsProps, IPnpjsState> {
    private LOG_SOURCE = "🅿PnPjsExample";
    private LIBRARY_NAME = "Documents";
    private _sp: SPFI;

    constructor(props: IPnpjsProps) {
        super(props);

        // set initial state
        this.state = {
            items: [],
            errors: []
        };
        this._sp = getSP();
    }

    public componentDidMount(): void {
        // read all file sizes from Documents Library
        this._readAllFilesSize();
    }

    private _readAllFilesSize = async (): Promise<void> => {
        try {
            // do PnP JS query, some notes:
            //   - .expand() method will retrive Item.File item but only Length property
            //   - .get() always returns a promise
            //   - await resolves promises making your code act synchronous, ergo Promise<IResponseItem[]> becomes IResponse[]

            // Extending our sp object to include caching behavior, this modification will add caching to the sp object itself
            // this._sp.using(Caching({store:"session"}));

            // Creating a new sp object to include caching behavior. This way our original object is unchanged.
            const spCache = spfi(this._sp).using(Caching({ store: "session" }));

            const response: IResponseItem[] = await spCache.web.lists
                .getByTitle(this.LIBRARY_NAME)
                .items
                .select("Id", "Title", "FileLeafRef", "File/Length")
                .expand("File/Length")();

            // use map to convert IResponseItem[] into our internal object IFile[]
            const items: IFile[] = response.map((item: IResponseItem) => {
                return {
                    Id: item.Id,
                    Title: item.Title || "Unknown",
                    Size: item.File?.Length || 0,
                    Name: item.FileLeafRef
                };
            });

            // Add the items to the state
            this.setState({ items });
        } catch (err) {
            Logger.write(`${this.LOG_SOURCE} (_readAllFilesSize) - ${JSON.stringify(err)} - `, LogLevel.Error);
        }
    }

    private _updateTitles = async (): Promise<void> => {
        try {
            // Will create a batch call that will update the title of each item
            //  in the library by adding `-Updated` to the end.
            const [batchedSP, execute] = this._sp.batched();

            //Clone items from the state
            const items: IFile[] = JSON.parse(JSON.stringify(this.state.items));

            const res: { Id: number, Title: string }[] = [];

            for (let i = 0; i < items.length; i++) {
                // you need to use .then syntax here as otherwise the application will stop and await the result
                batchedSP.web.lists
                    .getByTitle(this.LIBRARY_NAME)
                    .items
                    .getById(items[i].Id)
                    .update({ Title: `${items[i].Name}-Updated` })
                    .then(r => res.push(r))
                    .catch(e => console.log(`Error: ${e}`));
            }

            // Executes the batched calls
            await execute();

            // Results for all batched calls are available
            // Dirty update of UI
            for (let i = 0; i < res.length; i++) {
                items[i].Title = `${items[i].Name}-Updated`;
            }

            //Update the state which rerenders the component
            this.setState({ items });
        } catch (err) {
            Logger.write(`${this.LOG_SOURCE} (_updateTitles) - ${JSON.stringify(err)} - `, LogLevel.Error);
        }
    }

    private _getDemoItems = async (): Promise<void> => {
        try {
            const oldItems = this.state.items;

            // Construct the correct web URL
            const webUrl = `${window.location.origin}/sites/GFXSharePointDev`;
            console.log("Web URL:", webUrl);

            // Initialize the Web object
            const web = Web([this._sp.web, webUrl]);
            console.log("1. Initialized web object.");

            let newItems: IFile[] = [];

            if (web) {
                console.log('2. Entered if statement');
                const response: IResponseItem[] = await web.lists
                    .getByTitle(this.LIBRARY_NAME)
                    .items
                    .select("Id", "Title", "FileLeafRef", "File/Length")
                    .expand("File")();

                newItems = response.map((item: IResponseItem) => {
                    return {
                        Id: item.Id,
                        Title: item.Title || "Unknown",
                        Size: item.File?.Length || 0,
                        Name: item.FileLeafRef
                    };
                });
            }
            const items = oldItems.concat(newItems);
            console.log(items);
            this.setState({ items });
        } catch (err) {
            Logger.write(`${this.LOG_SOURCE} (_getDemoItems) - ${JSON.stringify(err)}`, LogLevel.Error);
        }
    }

    public render(): React.ReactElement<IPnpjsProps> {
        try {
            return (
                <div data-component={this.LOG_SOURCE} className={styles.pnpjs} >
                    <Label>Welcome to PnP JS Demo!</Label>
                    <PrimaryButton onClick={this._updateTitles}>Update Item Titles</PrimaryButton>
                    <br /><br />
                    <PrimaryButton onClick={this._getDemoItems}>Get Items from Demo Site</PrimaryButton>
                    <Label>List of documents:</Label>
                    <table width="100%">
                        <tr>
                            <td><strong>Title</strong></td>
                            <td><strong>Name</strong></td>
                            <td><strong>Size (KB)</strong></td>
                        </tr>
                        {this.state.items && this.state.items.map((item, idx) => {
                            return (
                                <tr key={idx}>
                                    <td>{item.Title}</td>
                                    <td>{item.Name}</td>
                                    <td>{(item.Size / 1024).toFixed(2)}</td>
                                </tr>
                            );
                        })}
                    </table>
                </div >
            );
        } catch (err) {
            Logger.write(`${this.LOG_SOURCE} (render) - ${JSON.stringify(err)}`, LogLevel.Error);
            return <></>;
        }
    }
}
