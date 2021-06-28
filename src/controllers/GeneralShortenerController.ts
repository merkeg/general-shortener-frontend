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

  static async deleteEntry(
    axios: AxiosStatic,
    baseEndpoint: string,
    bearerToken: string,
    slug: string
  ): Promise<Error | undefined> {
    try {
      const result = await axios.delete(urlJoin(baseEndpoint, slug), {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });
      const data: EntryListModel = result.data.message;
      return undefined;
    } catch (_) {
      return _;
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
