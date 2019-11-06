module.exports = {
    rethinkdb: {
        host: process.env.DB_HOST ||"localhost",  
        port: process.env.DB_PORT || 28015,
        authKey: "",
        db: "cfp_training_model_db",
    },
    tables: [
        {
            table: "cfp_menu_tb",
            id:"menu_id"
        },
        {
            table: "cfp_recipe_tb",
            id:"recipe_id"
        },
        {
            table: "cfp_template_tb",
            id:"template_id"
        }
    ]
}
