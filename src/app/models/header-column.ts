export interface IHeaderColumn {
    columId: number;
    columHeader: string;
    columnDataAlias: string;
    filterable: boolean | true;
}

export class HeaderColumn implements IHeaderColumn {
    constructor(
        public columId: number,
        public columHeader: string,
        public columnDataAlias: string,
        public filterable: boolean,
    ) {
        this.columId = columId;
        this.columHeader = columHeader;
        this.columnDataAlias = columnDataAlias;
        this.filterable = filterable;
    }
   
}