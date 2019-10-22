module.exports = {
    rethinkdb: {
        host: process.env.DB_HOST ||"localhost", // for docker 
        port: process.env.DB_PORT || 28015,
        authKey: "",
        db: "cfp_order_db",
    },
    tables: [
        {
            table: "cfp_order_processing_tb",
            id:"processingId"
        }
    ]
}
