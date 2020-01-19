import { ColorsService } from "./Colors.service";

describe("ColorService", () => {
  let sut;

  beforeEach(() => {
    sut = new ColorsService();
  });

  describe("getColor", () => {
    it("should return a color given an index", () => {
      expect(sut.getColor(100)).toBeTruthy();
      expect(sut.getColor(222)).toBeTruthy();
      expect(sut.getColor(234234)).toBeTruthy();
    });
    
    it("should wrap around the available colors", () => {
      const amountOfColors = sut.serviceColors.length;
      expect(sut.getColor(0)).toEqual(sut.getColor(amountOfColors));
    });

    it("should return all colors", () => {
      const amountOfColors = sut.serviceColors.length;
      const colors = [];
      for (let i = 0; i < 5 * amountOfColors; ++i) {
        colors.push(sut.getColor(i));
      }

      const distinctColors = [...new Set(colors.map(x => x))];

      expect(amountOfColors).toEqual(distinctColors.length);
    })
  })
})