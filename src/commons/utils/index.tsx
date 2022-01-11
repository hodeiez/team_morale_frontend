import { useEffect, useState } from "react";
import { Evaluation } from "../../components/evaluation/EvaluationTypes";
export const mergeArrays = (oldArr: any, newArr: any) => {
  console.log("old array", oldArr.length);
  console.log("new array", newArr.length);
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
export const useEventSource = (url: string) => {
  const [data, updateData] = useState<Evaluation[]>([]);
  useEffect(() => {
    const source = new EventSource(url);
    console.log("waiting for event");
    source.onmessage = function log(event) {
      const eventData: Evaluation = JSON.parse(event.data).evaluation;
      console.log("raw event data ", eventData);
      updateData((oldData) => {
        // it updates BASED ON evaluation ID
        if (oldData.find((v) => v.id === eventData.id)) {
          const updatedEvaluations = oldData.map((val) =>
            val.id === eventData.id ? { ...val, ...eventData } : val
          );
          return updatedEvaluations;
        }
        return [...oldData, eventData];
      });
    };
  }, []);
  return data;
};
