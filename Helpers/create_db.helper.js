const { getDbConnection } = require("../Utils/dbConnections");
const tables = require("./db_scripts.helper");

(async () => {
    let client = getDbConnection();
    try {
        let t = Object.keys(tables);
        console.log(t);
        for (let i = 0; i < t.length; i++) {
            try {
                await client.query(`DROP TABLE ${t[i]};`);
            } catch (err) {
                console.log(err.toString());
            }
        }
        for (let i = t.length - 1; i >= 0; i--) {
            console.log(t[i])
            console.log(tables[t[i]])
            await client.query(tables[t[i]]);
console.log(t[i]);
        }
    } catch (err) {
        console.log(err.toString());
    } finally {
        client.end();
    }
})();
