import React, { createContext } from "react";
import ReactDOM from "react-dom";

const ymaps3Reactify = await ymaps3.import("@yandex/ymaps3-reactify");
const reactify = ymaps3Reactify.reactify.bindTo(React, ReactDOM);

export const Common = reactify.module(ymaps3);
export const Hint = reactify.module(
  await ymaps3.import("@yandex/ymaps3-hint@0.0.1")
);
export const Controls = reactify.module(
  await ymaps3.import("@yandex/ymaps3-controls@0.0.1")
);
export const Cluster = reactify.module(
  await ymaps3.import("@yandex/ymaps3-clusterer@0.0.1")
);
