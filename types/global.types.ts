export type IBanner = {
    imageSrc: string;
    smallTitle: string;
    title: string;
    shortDescription: string;
    buttonTxt: string;
    pageLink: string;
}

export type IProperty = {
    externalID: string;
    price: number;
    title:string;
    rentFrequency?: number | string;
    rooms: number;
    area:number;
    coverPhoto: {
        url: string;
    };
    baths:number;
    agency:{};
    isVerified: boolean;
}