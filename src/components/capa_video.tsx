import HeroVideoDialog from "./ui/hero-video-dialog";

export function HeroVideoDialogDemoTopInBottomOut() {
  return (
    <div className="relative">
      <HeroVideoDialog
        className="dark:hidden block"
        animationStyle="top-in-bottom-out"
        videoSrc="/videos/video_teste.mp4"
        thumbnailSrc="/image_thumb.jpeg"
        thumbnailAlt="Hero Video"
      />
      <HeroVideoDialog
        className="hidden dark:block"
        animationStyle="top-in-bottom-out"
        videoSrc="/videos/video_teste.mp4"
        thumbnailSrc="/image_thumb.jpeg"
        thumbnailAlt="Hero Video"
      />
    </div>
  );
}
