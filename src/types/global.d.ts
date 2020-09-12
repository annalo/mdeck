declare type SlideContentElements = ReactNode;

declare interface Document {
  exitFullscreen: () => void;
  fullscreenElement: () => void;
  mozCancelFullScreen: () => void;
  mozFullScreenElement: () => void;
  msExitFullscreen: () => void;
  msRequestFullscreen: () => void;
  webkitExitFullscreen: () => void;
  webkitFullscreenElement: () => void;
}
