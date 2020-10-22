### GeoBache

A simple app intended to facilitate Geocaching on the blockchain.

## Functions

**Register**
Register a new point as a Geocache. Takes in (geographic data*) and stores it on the blockchain. Whenever a user visits the cache, they can compare their (geographic data) to the stored, and see if they are approximately at location. Returns boolean success.

**Confirm**
Takes in (geographic data) and determines if it is consistent with a registered Geocache. If so, it allows registering a message. Returns an empty list if invalid, or list of registered messages if valid.


*Encoding of geographic data to be determined