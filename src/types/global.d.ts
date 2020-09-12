declare type HtmlArray = string[];
declare type HtmlString = string;
declare type LineNumber = number;
declare type MarkdownString = string;

declare type SlideContentElements = Element[];
declare type CodeLineElement = Element;

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
