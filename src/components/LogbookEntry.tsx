import React from 'react'

type Props = {
    bigLog: LogbookEntry;
    uniqueId: number;
    focus: number;
    setFocus: any;
    setCurrentIndex: any;
    bigLogRefs: any;
  };
export default function LogbookEntry({bigLog}: Props) {
  return (
    <article>
        <h1>{bigLog.title}</h1>
        <p>{bigLog.desc}</p>
        <div>{bigLog.author}</div>
        <div>{bigLog.date}</div>
        <p>{bigLog.entry}</p>

    </article>
  )
}
