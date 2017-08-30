#!/bin/bash

# remember to start postgres on your own!

#killall bitcoind -w
#killall goldd -w

./gold/src/goldd -datadir=./gold_testnet
./bitcoin/src/bitcoind -datadir=./bitcoin_testnet

