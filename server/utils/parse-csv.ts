import { Readable, Transform } from "node:stream";
import papa from "papaparse";
export function parseCSV(text: Readable) {
  const papaStream = papa.parse(papa.NODE_STREAM_INPUT, {
    comments: "//",
    dynamicTyping: true,
  });

  const playerStream = new TransformStream({
    transform(playerRow, controller) {
      const obj: Player = {};
      for (const index of playerRow.keys()) {
        obj[columns[index]] = playerRow[index];
      }
      controller.enqueue(obj);
    },
  }) satisfies ReadableWritablePair<any, any>;

  return Readable.toWeb(text).pipeThrough(Transform.toWeb(papaStream)).pipeThrough(playerStream);
}
export type Player = { [K in (typeof columns)[number]]: string | number };
