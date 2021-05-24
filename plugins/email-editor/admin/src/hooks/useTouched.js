import React from "react";
import { isEqual } from "lodash";

export const useTouched = (initialData) => {
  const [initial, setInitial] = React.useState(initialData);
  const [touched, _setTouched] = React.useState(false);

  const setTouched = (value) => {
    _setTouched(!isEqual(initial, value));
  };

  const touchedSave = (data) => {
    setInitial(data);
    _setTouched(false);
  };

  return [touched, setTouched, touchedSave];
};
