import {
  findAllTrackMetadata,
  findTrackMetadataById,
} from "@/datastore/queries";
import { loadDatastore } from "@/datastore/db";

interface MockedTrackMetadata {
  id: string;
  title: string;
}

const response: MockedTrackMetadata[] = [
  { id: "1", title: "Track 1" },
  { id: "2", title: "Track 2" },
  { id: "3", title: "Track 3" },
];

const emptyResponse: MockedTrackMetadata[] = [];

jest.mock("@/datastore/db");

describe("services", () => {
  beforeEach(() => {
    (loadDatastore as jest.Mock).mockReturnValue(response);
  });

  afterEach(() => {
    (loadDatastore as jest.Mock).mockReset();
  });

  describe("findAllTrackMetadata", () => {
    it("should return all track metadata", async () => {
      const result = await findAllTrackMetadata();
      expect(result).toHaveLength(3);
      expect(result[0].id).toBe("1");
      expect(result[1].id).toBe("2");
      expect(result[2].id).toBe("3");
    });

    it("should return copies of the data, not references", async () => {
      const result1 = await findAllTrackMetadata();
      result1[0].title = "Modified";

      const result2 = await findAllTrackMetadata();
      expect(result2[0].title).toBe("Track 1");
    });

    it("should return an empty array if datastore is empty", async () => {
      (loadDatastore as jest.Mock).mockReturnValue(emptyResponse);

      const result = await findAllTrackMetadata();
      expect(result).toHaveLength(0);
    });
  });

  describe("findTrackMetadataById", () => {
    it("should return track metadata by id", async () => {
      const result = await findTrackMetadataById("1");
      expect(result).not.toBeNull();
      expect(result?.id).toBe("1");
      expect(result?.title).toBe("Track 1");
    });

    it("should return null if track not found", async () => {
      const result = await findTrackMetadataById("999");
      expect(result).toBeNull();
    });

    it("should return a copy of the track, not a reference", async () => {
      const result = await findTrackMetadataById("1");
      (result as MockedTrackMetadata).title = "Modified";

      const result2 = await findTrackMetadataById("1");
      expect(result2?.title).toBe("Track 1");
    });
  });
});
