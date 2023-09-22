import React from "react";
import { RootSiblingParent } from "react-native-root-siblings";
import { RootNavigation } from "./RootNavigation";

export const router = () => {
  return (
    <RootSiblingParent>
      <RootNavigation />
    </RootSiblingParent>
  );
};