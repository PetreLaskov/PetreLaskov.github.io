#!/bin/bash
jq() { '/path/to/programs/nodejs/node.exe' -e 'let s="";process.stdin.on("data",d=>s+=d);process.stdin.on("end",()=>process.stdout.write(String(JSON.parse(s).tool_input.command)+"\n"));'; }
export -f jq
exec bash "$1"
