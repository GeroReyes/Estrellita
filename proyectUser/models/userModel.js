const pool = require('../config/db');

class User{

    static async findAll(){
        const result = await pool.query('SELECT * FROM users');
        return result.rows;
    }

    static async create(data)
    {
        const {nombre, email} = data; 
        const result = await pool.query('INSERT INTO users(nombre, email) VALUES($1, $2) RETURNING *',
            [nombre, email]

        );
        return result.rows[0];
    }

    static async findById(id)
    {
        const result = await pool.query('SELECT * FROM users where id = $1',[id]);
        return result.rows[0];
    }

    static async update(id, data)
    {
        const {nombre,email} = data;
        const result = await pool.query('UPDATE users SET nombre = $1, email = $2, update_at = current_timestamp where id = $3 and delete_at = null RETURNING *', [nombre, email, id]);
        return result.rows[0];

    }
 
    static async delete(id)
    {
        const result = await pool.query('DELETE FROM users set delete_at now() where id = $1 RETURNING *',[id]);
        return { message:'User deleted successfully'};
    }
    
    static async getAllUsersExcel() {
        const query = `SELECT nombre, email FROM users;`;
        const result = await pool.query(query);
        return result.rows;
    };
}



module.exports = User;
