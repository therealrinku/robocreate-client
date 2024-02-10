export interface FBPostModel {
  //<>>> supporting text only for now!
  message: string;
  selectedPage: {
    access_token: string;
    category: string;
    category_list: {
      id: string;
      name: string;
    }[];
    name: string;
    id: string;
    tasks: string[];
  };
}

export interface FBMeModel {
  id: string;
  accounts: {
    data: {
      access_token: string;
      category: string;
      category_list: {
        id: string;
        name: string;
      }[];
      name: string;
      id: string;
      tasks: string[];
    }[];
    paging: {
      cursors: {
        before: string;
        after: string;
      };
    };
  };
}
