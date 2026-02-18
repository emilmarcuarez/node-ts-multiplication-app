import { yarg } from "./config/plugins/args.plugin";
import { ServerApp } from "./presentation/server-app";

// console.log(yarg);


(async () => {
    await main();
})();


async function main() {
    console.log(yarg);
    const {b:base, l:limit, s:showTable, n:fileName, d:fileDestination} = yarg;
    ServerApp.run({base: base, limit: limit, showTable: showTable, fileName, fileDestination});
}