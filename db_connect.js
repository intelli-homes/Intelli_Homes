
  const { Client } = require("pg");

  const client = new Client({
    user: "postgres",
    password: "3980",
    host: "localhost",
    database: "Intellihomes",
  });

  const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)
  
    client.query('SELECT * from user', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with ID: ${id}`)
    })
  }

  const getUsers = (request, response) => {
    pool.query('SELECT * FROM User ORDER BY UserId ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  
const createUser = (request, response) => {
    const { name, email } = request.body
  
    pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${result.insertId}`)
    })

}

  module.exports ={
      deleteUser,
      getUsers,
      createUser

  }

