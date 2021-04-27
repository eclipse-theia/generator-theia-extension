npm install -g yo
npm link
mkdir tmp
cd tmp
exit_code=0
for d in ../templates/*/ ; do
    extension=$(basename $d)
    mkdir $extension
    cd $extension
    yo theia-extension $extension -y $extension || exit_code=$?
    cd ..
done
cd ..
exit $exit_code
