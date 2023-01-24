export type IBanner = {
  imageSrc: string;
  smallTitle: string;
  title: string;
  shortDescription: string;
  buttonTxt: string;
  pageLink: string;
};

export type IProperty = {
  externalID?: string;
  price?: number;
  title: string;
  rentFrequency?: number | string;
  rooms: number;
  area: number;
  coverPhoto: {
    url: string;
  };
  baths: number;
  agency: {};
  isVerified: boolean;
};

export type GetPropertyResponse = {
  data: {
    hits: IProperty[];
  };
};

type IPhoto = {
  url: string;
  title?: string;
  orderIndex: number;
};

export interface ISingleProperty extends IProperty {
  photos: IPhoto[];
  description: string;
  type: string;
  purpose: string;
  furnishingStatus: string;
  amenities: unknown[];
}

export type InifinitePage = {
  nextCursor: number | undefined;
  page: {
    data: IProperty[];
    hasMore: boolean;
  };
};
// price, rentFrequency, rooms, title, baths, area, agency, isVerified, description, type, purpose, furnishingStatus, amenities, photos
