import React from "react";
import { LogbookEntry as LBEntry } from "typings";

type Props = {
  bigLog: LBEntry;
  uniqueId: number;
  focus: number;
  setFocus: any;
  setCurrentIndex: any;
  bigLogRefs: any;
};
export default function LogbookEntry({ bigLog }: Props) {
  return (
    <article>
      <h1>{bigLog.title}</h1>
      <p>{bigLog.description}</p>
      <div>{bigLog.date.toString()}</div>
      <p>{bigLog.entry}</p>
    </article>
  );
}
