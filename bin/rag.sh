#!/bin/bash

ACTION=$1;
NAME=$2;
VERSION=0.1;

manual () {
  echo
  echo "CLI for NestJS to assists in business development."
  echo
  echo "Syntax: rag [options [name]]"
  echo " options:"
  echo "   s|scaffold [name]    Scaffold by creating controller, service"
  echo "                        and module by following company standards."
  echo "                        e.g. bin/rag.sh s hello-world"
  echo
  echo "   -h|help              Print this Help."
  echo "   -v|version           Print the CLI version."
  echo
}

# due to the format in the codes not following the eslint such as indent and quote, by running this will fix the basic
lint() {
  echo "Linting the scaffolded structure..."
  ./node_modules/.bin/eslint src/app/"$name"/*.ts --fix
}

prettier() {
  NAME=$1;
  echo "Prettifying the scaffolded structure..."
  ./node_modules/.bin/prettier --write "src/app/$NAME/**/*.ts"
}

version() {
  echo "CLI version "
  echo $VERSION
  echo
  echo "NestJS version "
  nest -v
}

scaffold() {
  NAME=$1;
  nest g mo app/"$NAME";
  nest g co app/"$NAME";
  nest g s app/"$NAME";

  # create directory
  mkdir src/app/"$NAME"/dto
  mkdir src/app/"$NAME"/exception
  mkdir src/app/"$NAME"/query-filter
  mkdir src/app/"$NAME"/spec

  mv src/app/"$NAME"/*.spec.ts src/app/"$NAME"/spec

  # fix importing after moving spec
  CONTROLLER_IMPORT=".\/$NAME.controller"
  SERVICE_IMPORT=".\/$NAME.service"
  sed -i -e "s/$CONTROLLER_IMPORT/.$CONTROLLER_IMPORT/g" src/app/"$NAME"/spec/"$NAME".controller.spec.ts
  sed -i -e "s/$SERVICE_IMPORT/.$SERVICE_IMPORT/g" src/app/"$NAME"/spec/"$NAME".service.spec.ts
}


if [ "$ACTION" == '-h' ] || [ "$ACTION" == 'help' ] ; then
  manual
elif [ "$ACTION" == 's' ] || [ "$ACTION" == 'scaffold' ] ; then
  scaffold "$NAME" && lint && prettier "$NAME"
elif [ "$ACTION" == '-v' ] || [ "$ACTION" == 'version' ] ; then
  version
else
  manual
fi

