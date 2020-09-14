class Helpers {

    constructor() {

    }

    select_column_from_table = (knex, column_name, table_name) => {
        return new Promise((resolve, reject) => {
            knex
                .select(column_name)
                .from(table_name)
                .then((select_response) => {
                    return_payload = []
                    select_response.forEach((entry) => {
                        return_payload.push(entry[column_name])
                    })
                    resolve(return_payload)
                })
        })
    }

    // A function to randomly generate an id to be grabbed from a foreign key array
    random_index = (max) => {
        max = Math.floor(max)
        return Math.floor(Math.random() * (max + 1))
    }

    pick_random_value_from_array = (sample_array) => {
        const sample_index = this.random_index(sample_array.length - 1)
        return sample_array[sample_index]
    }


}

module.exports.Helpers = Helpers