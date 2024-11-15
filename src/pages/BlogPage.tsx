import { Typography } from "@mui/material";
import { getCompanyCulture2 } from "../services/apiEvents";
import Background2 from "../ui/Background2";
import BlogsCards from "../ui/BlogsCards";
import EventsCarousel from "../ui/EventsCarousel";
import BlogHero from "../ui/SingleBlogPageComponents/BlogHero";
import BlogContent from "../ui/SingleBlogPageComponents/BlogContent";
import CommentSection from "../features/CommentsAndReplies/CommentSection";
import CommentsList from "../features/CommentsAndReplies/CommentsList";

function BlogPage() {
  return (
    <>
      <BlogHero>
      <Typography variant="body1" sx={{ mb: 2 }}>
              Блог
            </Typography>
            <Typography variant="h4">
              Како до најдобар избор при <br />
              процесот на регрутација
            </Typography>
            <Typography variant="h5" sx={{ mt: "2rem" }}>
              Oд <span style={{ color: "#E87B22" }}>Ѓоко Вукановски</span> | 20
              Јуни, 2024
            </Typography>
      </BlogHero>
      <EventsCarousel />
      <BlogContent />
      <CommentSection />
      <CommentsList />
      <Background2 />
      <BlogsCards queryFn={getCompanyCulture2} queryKey="companyCulture2">
        <Typography variant="h4">Слични блогови </Typography>
      </BlogsCards>
    </>
  );
}
export default BlogPage;
