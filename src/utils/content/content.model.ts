export const PAGE_NAME = {
  ABOUT: "about_me_page",
  CONTACT: "contact_page",
  LANDING: "landing_page",
} as const;

export type PageName = (typeof PAGE_NAME)[keyof typeof PAGE_NAME];

export interface PageContentMap {
  landing_page: {
    title: string;
    description: string;
    title_bottom: string;
    description_bottom: string;
    image_urls: string;
  };
  about_me_page: {
    title: string;
    description: string;
    image_url: string;
  };
  contact_page: {
    title: string;
    description: string;
    header_title: string;
    header_description: string;
  };
}
