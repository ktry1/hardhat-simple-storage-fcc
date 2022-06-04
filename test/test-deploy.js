const {ethers} = require("hardhat");
const {expect, assert} = require("chai");

describe("SimpleStorage", function() {
    let contractFactory,SimpleStorage
    beforeEach(async function(){
        contractFactory = await ethers.getContractFactory("SimpleStorage");
        SimpleStorage = await contractFactory.deploy();
    })

    it("Should start with a favorite number of 0", async function(){
        const currentValue = await SimpleStorage.retrieve();
        const expectedValue = "0";
        assert.equal(currentValue.toString(),expectedValue);
    });
    it("Should update when we call store", async function() {
        const expectedValue = "7";
        const transactionResponce = SimpleStorage.store(expectedValue);
        const currentValue = await SimpleStorage.retrieve();
        assert.equal(currentValue.toString(),expectedValue);
    });
    it("Should add people to the people list:", async function() {
        SimpleStorage.addPerson("Jack", 5);
        const JackNumber = await SimpleStorage.NameToFavoriteNumber("Jack");
        assert.equal(JackNumber,5);
    })
} );