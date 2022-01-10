import { useEffect, useState } from "react";
export const mergeArrays = (oldArr: any, newArr: any) => {
  if (oldArr.length > 0) {
    return [oldArr, newArr].reduce((a, b) =>
      a.map((c: any, i: string | number) => Object.assign({}, c, b[i]))
    );
  }
  return newArr;
};

export const useRandomColorCard = (color: any) => {
  const [background, setBackground] = useState("#b2beb5");
  useEffect(() => {
    const number = Math.floor(Math.random() * 4);
    switch (number) {
      case 0:
        setBackground(color.one);
        break;
      case 1:
        setBackground(color.two);
        break;
      case 2:
        setBackground(color.three);
        break;
      case 3:
        setBackground(color.four);
        break;
    }
  }, []);
  return background;
};

export const greyPalleteColors = {
  one: "#b2beb5",
  two: "#bfc1c2",
  three: "#cfcfc4",
  four: "#bebebe",
};
