type ImageResultItem = {
  id: string;
  title: string;
  originalUrl: string;
  url: string;
  averageColor: string;
  averageColorObject: {
    r: number;
    g: number;
    b: number;
  };
  height: number;
  width: number;
};

export default ImageResultItem;
