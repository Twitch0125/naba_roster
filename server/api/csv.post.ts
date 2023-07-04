import { Readable } from "node:stream";

export default eventHandler(async (event) => {
  const body = await readMultipartFormData(event);
  if (body?.length) {
    const data = body[0].data;
    const readbleStream = Readable.from(data);
    const players = [];
    //clear out the table
    db.delete(teamsTable).run();
    db.delete(playersTable).run();
    await parseCSV(readbleStream).pipeTo(
      new WritableStream({
        async write(chunk) {
          players.push(chunk);
          //if memory is an issue, you can insert one at a time
          //db.insert(playersTable).values(chunk).run();
          //tends to take about 3.5s to insert about 500 rows instead of 200-300ms
        },
      })
    );
    const detectedTeams = new Map();
    await db.transaction(async (tx) => {
      players.forEach((player) => {
        detectedTeams.get(player.team_id) ||
          detectedTeams.set(player.team_id, {
            id: player.team_id,
            name: player.team_name,
          });
        tx.insert(playersFullTable).values(player).run();
      });
    });
    db.insert(teamsTable).values(Array.from(detectedTeams.values())).run();
  }
  return sendRedirect(event, "/");
});
