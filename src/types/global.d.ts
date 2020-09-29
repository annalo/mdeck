declare module "*.svg" {
  const value: SvgrComponent;
  export default value;
}

declare type SlideContentElements = ReactNode;

declare type RequestPresentation = () => void;
