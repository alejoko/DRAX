#!/bin/bash
org=/home/azure/azagent/_work/r3/a/_UI-Develop/drop
dest=/var/www/glovo/ui-development/

cp $org/_UI-Develop.zip $dest
cd $dest

unzip -o _UI-Develop.zip
rm _UI-Develop.zip

