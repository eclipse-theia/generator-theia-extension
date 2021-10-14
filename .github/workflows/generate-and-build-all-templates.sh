npm install -g yo
npm link
mkdir tmp
cd tmp
theia_v="$1"
failed_templates=()
for d in ../templates/*/ ; do
    exit_code=0
    extension=$(basename $d)
    mkdir $extension
    cd $extension
    yo theia-extension $extension -y $extension -t $theia_v || exit_code=$?
    cd ..
    rm -rf $extension
    if [ $exit_code -ne 0 ]; then
        failed_templates+=( "$extension failed with Code: $exit_code" )
    fi
done
cd ..
if [ ${#failed_templates[@]} -ne 0 ]; then
    printf '%s\n' "${failed_templates[@]}"
    exit 1
else 
    exit 0
fi
