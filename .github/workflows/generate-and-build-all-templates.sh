#!/usr/bin/env bash
# Generates every template with the given Theia version and builds the resulting
# app, so regressions in generation *or* in the produced browser/electron build
# (e.g. dependency hoisting issues) are caught. Pass "latest" or "next" as $1.
set -uo pipefail

npm install -g yo
npm link

theia_v="$1"
mkdir -p tmp
cd tmp

failed_templates=()
for d in ../templates/*/ ; do
    template=$(basename "$d")
    echo "::group::Generate and build '$template' (Theia $theia_v)"
    exit_code=0
    rm -rf "$template"
    mkdir "$template"
    # 'cd' happens inside the subshell so the parent shell stays in 'tmp'.
    # Steps are chained with '&&' so any failure propagates as the subshell's
    # exit code (bash suppresses 'set -e' for a subshell used as a '||' operand).
    # The generator runs 'npm install' (compiling the extension via 'prepare');
    # 'npm install' does not build the apps, so bundle them explicitly.
    (
        cd "$template" &&
        yo theia-extension "$template" -y "$template" -t "$theia_v" &&
        npm run build:browser &&
        npm run build:electron
    ) || exit_code=$?
    rm -rf "$template"
    echo "::endgroup::"
    if [ $exit_code -ne 0 ]; then
        failed_templates+=( "$template failed with code $exit_code" )
    fi
done

if [ ${#failed_templates[@]} -ne 0 ]; then
    printf '%s\n' "${failed_templates[@]}"
    exit 1
else
    echo "All templates generated and built successfully."
    exit 0
fi
