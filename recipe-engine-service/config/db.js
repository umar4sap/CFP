module.exports = {
    rethinkdb: {
        host: process.env.DB_HOST ||"52.188.192.123",  
        port: process.env.DB_PORT || 28015,
        authKey: "",
        db: "cfp_recipe_engine_db",
    },
    tables: [
        {
            table: "cfp_recipe_engine_tb",
            id:"gen_recipe_id"
        }
    ]
}
