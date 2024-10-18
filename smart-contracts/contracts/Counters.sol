// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/// @title Counters
/// @notice This library provides a simple counter implementation
/// @dev Use this for ID generation or any other incremental counting needs
library Counters {
    /// @dev Struct to hold the counter value
    struct Counter {
        uint256 _value; // The counter value, default: 0
    }

    /// @notice Get the current value of the counter
    /// @param counter The Counter struct
    /// @return The current value of the counter
    function current(Counter storage counter) internal view returns (uint256) {
        return counter._value;
    }

    /// @notice Increment the counter by 1
    /// @dev This function uses unchecked math to save gas
    /// @param counter The Counter struct
    function increment(Counter storage counter) internal {
        unchecked {
            counter._value += 1;
        }
    }

    /// @notice Decrement the counter by 1
    /// @dev This function checks for underflow and reverts if the counter is already 0
    /// @param counter The Counter struct
    function decrement(Counter storage counter) internal {
        uint256 value = counter._value;
        require(value > 0, "Counter: decrement overflow");
        unchecked {
            counter._value = value - 1;
        }
    }

    /// @notice Reset the counter to 0
    /// @param counter The Counter struct
    function reset(Counter storage counter) internal {
        counter._value = 0;
    }
}