// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;
pragma experimental ABIEncoderV2;

contract GeoBache {
  address public owner = msg.sender;
  struct Coords {
      uint32 lat;
      uint32 long;
  }
  mapping(uint => Coords) public caches;
  Coords[] coordinateList;

  modifier restricted() {
    require(
      msg.sender == owner,
      "This function is restricted to the contract's owner"
    );
    _;
  }

  function register(uint32 lat, uint32 long) public restricted returns(bool) {
    Coords memory newCoords = Coords(lat, long);
    coordinateList.push(newCoords);
    caches[coordinateList.length] = newCoords;
    return true;
  }

  function lookUp(uint index) public view restricted returns(Coords memory coordinates) {
    return caches[index];
  }

  function checkLocation(uint index, uint32 lat, uint32 long) public view returns(bool) {
    uint32 _lat = caches[index].lat;
    uint32 _long = caches[index].long;
    if(lat >= _lat - 1 || lat <= _lat + 1) {
        if(long >= _long - 1 || long <= _long + 1) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
  }
}