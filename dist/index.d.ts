import GOOGLE_QUERY from "./constant/query/GOOGLE_QUERY";
import Config from "../types/config";
import Results from "../types/results";
declare function GOOGLE_IMG_SCRAP(config: Config): Promise<Results>;
export { GOOGLE_IMG_SCRAP, GOOGLE_QUERY };
