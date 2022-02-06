import { useEffect, useState } from "react";
import { Evaluation } from "../../components/evaluation/EvaluationTypes";

const isNetlify = process.env.REACT_APP_USING_NETLIFY;

export const mergeArrays = (oldArr: Evaluation[], newArr: Evaluation[]) => {
  if (oldArr.length > 0) {
    var check = new Set(newArr.map((e) => e.id));

    return [...newArr, ...oldArr.filter((e) => !check.has(e.id))];
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
  }, [color]);
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
  }, [url]);
  return data;
};
const runEventSource = (url: any, updateData: any) => {
  const source = new EventSource(url);

  source.onmessage = function log(event) {
    const eventData: Evaluation = JSON.parse(event.data).evaluation;

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
