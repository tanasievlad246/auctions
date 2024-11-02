#!/bin/bash
redis-cli -h localhost -a password RPUSH queue:default "auctions"
