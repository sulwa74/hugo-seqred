#!/bin/bash
PANDOC=$(which pandoc)
PARAM="-s -r html -w markdown"
GREP=$(which grep)
SED=$(which sed)

IFS=$'\n' read -d '' -r -a FILES < ./urls.txt

for FILE in "${FILES[@]}"; do
IFS=";" read -r -a arr <<<"${FILE}"
mkdir -p $(dirname ${arr[1]})
$PANDOC $PARAM ${arr[0]} | $GREP -v "^:::" | $SED -e '/^Error 404/,/_search_field}/d' -e '/^\[SEQRED S/,/footer-left}$/d' -e '/format-detection/,/- WordPress 5.8.4$/d' -e '/^robots: /d' -e '/^viewport: /,/=0$/d' | $GREP -v 'msapplication-TileImage: ' > ${arr[1]} 
done
