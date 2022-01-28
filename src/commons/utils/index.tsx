import { useEffect, useState } from "react";
import { Evaluation } from "../../components/evaluation/EvaluationTypes";

const isNetlify = process.env.REACT_APP_USING_NETLIFY;

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
export const useEventSource = (url: string) => {
  const [data, updateData] = useState<Evaluation[]>([]);
  useEffect(() => {
    runEventSource(url, updateData);
    if (isNetlify) {
      const theInterval = setInterval(() => {
        runEventSource(url, updateData);
      }, 40000);
      return () => clearInterval(theInterval);
    }
  }, []);
  return data;
};
const runEventSource = (url: any, updateData: any) => {
  const source = new EventSource(url);
  console.log("waiting for event");
  source.onmessage = function log(event) {
    const eventData: Evaluation = JSON.parse(event.data).evaluation;
    console.log("raw event data ", eventData);
    updateData((oldData: any) => {
      // it updates BASED ON evaluation ID
      if (oldData.find((v: any) => v.id === eventData.id)) {
        const updatedEvaluations = oldData.map((val: any) =>
          val.id === eventData.id ? { ...val, ...eventData } : val
        );
        return updatedEvaluations;
      }
      return [...oldData, eventData];
    });
  };
  if (!isNetlify) {
    source.onerror = () => {
      console.log("unauthorized");
      source.close();
      return { error: "unauthorized" };
    };
  }
};
