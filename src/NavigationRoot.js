import React from "react";



export const navigationRaf = React.createRef();

export const navigate = (name, perams) => {
  navigationRaf.current && navigationRaf.current.navigate(name, perams);
}