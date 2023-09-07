import chai from "chai";

const expect = chai.expect;

describe("Basic", function () {
  it("should make sure 1 + 1 = 2", function () {
    expect(1 + 1).to.equal(2);
    expect(1 + 1).to.not.equal(3);
  });
  it("should return -1 if a number does not exist in an array", function () {
    expect([1, 2, 3].indexOf(4)).to.equal(-1);
  });
});
