import  { ethers } from "hardhat";
import  { expect, assert } from "chai";
import {SimpleStorage, SimpleStorage__factory} from "../typechain-types";

describe("SimpleStorage", function () {
  let simpleStorage : SimpleStorage, simpleStorageFactory : SimpleStorage__factory;

  beforeEach(async function () {
    simpleStorageFactory = (await ethers.getContractFactory("SimpleStorage")) as SimpleStorage__factory;
    simpleStorage = await simpleStorageFactory.deploy();
  });

  it("Should start with a favorite number of 0", async function () {
    const currentValue = await simpleStorage.retrieve();
    const expectedValue = 0;
    assert.equal(currentValue.toString(), expectedValue.toString());
  });

  it("Should update favorite number to 15", async function () {
    await simpleStorage.store("15");
    const updatedValue = await simpleStorage.retrieve();
    const expectedValue = 15;
    assert.equal(updatedValue.toString(), expectedValue.toString());
  });
  // it("Should add a user by name and favorite number", async function () {
  //   await simpleStorage.addPerson("Sola", "8");
  //   const expectedValue = { favoriteNumber: 8, name: "Sola" };
  //   let listOfPeople;
  //   await simpleStorage.people.call(function (err, res) {
  //     listOfPeople = res;
  //   });
  //   assert.equal(listOfPeople[0], expectedValue);
  // });
});
