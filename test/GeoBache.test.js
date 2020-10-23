const GeoBache = artifacts.require("GeoBache");

contract("GeoBache", accounts => {
        it("should register a new cache", () =>
            GeoBache.deployed()
                .then(contract => contract.register(100050,200000))
                .then(registration => {
                    assert(registration);
            }));

        it("registered cache should have lat 1 long 2", () =>
            GeoBache.deployed()
                .then(contract => contract.lookUp(1))
                .then(cache => {
                    assert.equal(cache.lat, 100050);
                    assert.equal(cache.long, 200000);
            }));

        it("should recognize positions within one unit of cache", () =>
            GeoBache.deployed()
                .then(contract => contract.checkLocation(1, 100049,200001))
                .then(local => {
                    assert(local)
            }));
    });