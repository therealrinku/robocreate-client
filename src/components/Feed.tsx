import { feedModel, feedPostModel } from "@/models/fb";
import { FiLink2, FiMessageCircle, FiShare2, FiThumbsUp } from "react-icons/fi";

interface FeedProps {
  feed: feedModel;
  pageName?: string;
}

interface FeedPostProps {
  pageName?: string;
  post: feedPostModel;
}

export default function Feed({ feed, pageName }: FeedProps) {
  return feed.data?.map((post) => {
    return <FeedPost post={post} pageName={pageName} />;
  });
}

function FeedPost({ post, pageName }: FeedPostProps) {
  return (
    <div key={post.id} className="bg-white border flex flex-col p-2 flex gap-2  shadow w-full max-w-[400px]">
      <p className="font-bold">{pageName}</p>
      <p className="text-xs">{new Date(post.created_time).toDateString()} </p>

      {post.full_picture ? (
        <img className="w-full my-10" src={post.full_picture} />
      ) : (
        <p className="my-3">{post.message}</p>
      )}

      <div className="flex flex-col gap-2">
        <div className="flex gap-3">
          {post.likes && (
            <span className="flex items-center gap-2">
              <FiThumbsUp /> {post.likes.summary.total_count}
            </span>
          )}
          {post.comments && (
            <span className="flex items-center gap-2">
              <FiMessageCircle /> {post.comments.summary.total_count}
            </span>
          )}
          {post.shares && (
            <span className="flex items-center gap-2">
              <FiShare2 /> {post.shares.count}
            </span>
          )}
          <a href={post.permalink_url} target="_blank" className="flex ml-auto items-center gap-2">
            <FiLink2 /> Link
          </a>
        </div>
      </div>
    </div>
  );
}
