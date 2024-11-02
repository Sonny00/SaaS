#!/bin/sh
until mongosh --host mongo --eval "print('waiting for connection')" > /dev/null 2>&1; do
  sleep 2
done
exec "$@"
