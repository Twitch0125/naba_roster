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
    db.delete(playersFTSTable).run();
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
        if (player.team_id === 0) {
          player.team_name = "Free Agents";
        }
        detectedTeams.get(player.team_id) ||
          detectedTeams.set(player.team_id, {
            id: player.team_id,
            name: player.team_name,
          });
        tx.insert(playersFullTable).values(player).run();
        tx.insert(playersFTSTable)
          .values({
            id: player.id,
            first_name: player.first_name,
            last_name: player.last_name,
            team_name: player.team_name,
            team_id: player.team_id,
          })
          .run();
      });
    });
    detectedTeams.set(0, { id: 0, name: "Free Agents" });
    db.insert(teamsTable).values(Array.from(detectedTeams.values())).run();
  }
  return sendRedirect(event, "/");
});
