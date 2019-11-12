module.exports = {
    rethinkdb: {
        host: process.env.DB_HOST ||"localhost",  
        port: process.env.DB_PORT || 28015,
        authKey: "",
        db: "cfp_order_db",
    },
    tables: [
        {
            table: "cfp_order_processing_tb",
            id:"order_processing_id"
        }
    ]
}
