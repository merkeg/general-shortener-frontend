import { AxiosStatic } from "axios";
import urlJoin from "proper-url-join";

export default class GeneralShortenerController {
  static async listEntries(
    axios: AxiosStatic,
    baseEndpoint: string,
    bearerToken: string
  ): Promise<[EntryModel[] | undefined, Error | undefined]> {
    try {
      const result = await axios.get(urlJoin(baseEndpoint, "/list"), {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });
      const data: EntryListModel = result.data.message;
      return [data.data, undefined];
    } catch (_) {
      return [undefined, _];
    }
  }
}

export interface EntryListModel {
  newOffset: number;
  data: EntryModel[];
}

export interface EntryModel {
  slug: string;
  type: string;
  mime?: string;
  size?: number;
  deletionCode?: string;
}
