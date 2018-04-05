import getTargets from "../lib/targets-parser";

describe("getTargets", () => {
  it("parses", () => {
    expect(
      getTargets({
        chrome: 49,
        firefox: "55",
        ie: "9",
        node: "6.10",
        electron: "1.6",
      }),
    ).toEqual({
      chrome: "49.0.0",
      electron: "1.6.0",
      firefox: "55.0.0",
      ie: "9.0.0",
      node: "6.10.0",
    });
  });

  describe("browser", () => {
    it("merges browser key targets", () => {
      expect(
        getTargets({
          browsers: "chrome 56, ie 11, firefox 51, safari 9",
          chrome: "49",
          firefox: "55",
          ie: "9",
        }),
      ).toEqual({
        chrome: "49.0.0",
        firefox: "55.0.0",
        ie: "9.0.0",
        safari: "9.0.0",
      });
    });

    it("works with TP versions", () => {
      expect(
        getTargets({
          browsers: "safari tp",
        }),
      ).toEqual({
        safari: "tp",
      });
    });

    it("returns TP version in lower case", () => {
      expect(
        getTargets({
          safari: "TP",
        }),
      ).toEqual({
        safari: "tp",
      });
    });

    it("ignores invalid", () => {
      expect(
        getTargets({
          browsers: 59,
          chrome: "49",
          firefox: "55",
          ie: "11",
        }),
      ).toEqual({
        chrome: "49.0.0",
        firefox: "55.0.0",
        ie: "11.0.0",
      });
    });
  });

  describe("esmodules", () => {
    it("returns browsers supporting modules", () => {
      expect(
        getTargets({
          esmodules: true,
        }),
      ).toEqual({
        chrome: "61.0.0",
        safari: "10.1.0",
        firefox: "60.0.0",
        ios: "10.3.0",
        edge: "16.0.0",
      });
    });

    it("returns browsers supporting modules, ignoring browsers key", () => {
      expect(
        getTargets({
          esmodules: true,
          browsers: "ie 8",
        }),
      ).toEqual({
        chrome: "61.0.0",
        safari: "10.1.0",
        firefox: "60.0.0",
        ios: "10.3.0",
        edge: "16.0.0",
      });
    });

    it("returns browser supporting modules and keyed browser overrides", () => {
      expect(
        getTargets({
          esmodules: true,
          ie: 11,
        }),
      ).toEqual({
        chrome: "61.0.0",
        safari: "10.1.0",
        firefox: "60.0.0",
        ios: "10.3.0",
        ie: "11.0.0",
        edge: "16.0.0",
      });
    });

    it("returns browser supporting modules and keyed browser overrides, ignoring browsers field", () => {
      expect(
        getTargets({
          esmodules: true,
          browsers: "ie 10",
          ie: 11,
        }),
      ).toEqual({
        chrome: "61.0.0",
        safari: "10.1.0",
        ios: "10.3.0",
        ie: "11.0.0",
        edge: "16.0.0",
        firefox: "60.0.0",
      });
    });
  });

  describe("node", () => {
    it("should return the current node version with option 'current'", () => {
      expect(
        getTargets({
          node: true,
        }),
      ).toEqual({
        node: process.versions.node,
      });
    });
  });

  describe("electron", () => {
    it("should be its own target", () => {
      expect(
        getTargets({
          chrome: "46",
          electron: "0.34",
        }),
      ).toEqual({
        chrome: "46.0.0",
        electron: "0.34.0",
      });
    });
  });
});
