// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;
pragma experimental ABIEncoderV2;

contract GeoBache {
  address public owner = msg.sender;
  struct Coords {
      int32 lat;
      int32 long;
  }
  mapping(uint => Coords) public caches;
  Coords[] coordinateList;
  event Cache(
    uint index
  );

  modifier restricted() {
    require(
      msg.sender == owner,
      "This function is restricted to the contract's owner"
    );
    _;
  }

  function register(int32 lat,int32 long) public restricted returns(uint) {
    Coords memory newCoords = Coords(lat, long);
    coordinateList.push(newCoords);
    caches[coordinateList.length] = newCoords;
    emit Cache(coordinateList.length);
    return coordinateList.length;
  }

  function lookUp(uint index) public view restricted returns(Coords memory coordinates) {
    return caches[index];
  }

  function checkLocation(uint index, int32 lat, int32 long) public view returns(bool) {
    int32 _lat = caches[index].lat;
    int32 _long = caches[index].long;
    if(lat >= _lat - 1 && lat <= _lat + 1) {
        if(long >= _long - 1 && long <= _long + 1) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
  }
}
