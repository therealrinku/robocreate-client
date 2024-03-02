export interface latestPostsResponseModel {
  posts: feedModel;
  success: boolean;
}

export interface feedModel {
  data?: feedPostModel[];
  paging?: {
    cursors: {
      before: string;
      after: string;
    };
    next: string;
  };
}

export interface feedPostModel {
  likes: {
    data: any[];
    summary: {
      total_count: number;
      can_like: boolean;
      has_liked: boolean;
    };
  };
  comments: {
    data: any[];
    summary: {
      order: string;
      total_count: number;
      can_comment: boolean;
    };
  };
  permalink_url: string;
  message: string;
  created_time: string;
  full_picture?: string;
  shares?: {
    count?: number;
  };
  id: string;
}
