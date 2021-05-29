const connection = require('../database/connection');

module.exports = {

  async create(request, response) {
    const { name, email, address, phone, status, role, description, type, objective} = request.body;

    const [id] = await connection('user').insert({
      name,
      email,
      address,
      phone,
      status,
      role,
      description,
      type,
      objective
    });
    return response.json({ id })
  },

  async index(request, response) {
    const users = await connection('user')
      .select('*');
    return response.json(users);
  },

  async delete(rquest, response) {
    const { id } = request.params;

    const user = await connection('user')
      .where('id', id)
      .first()

    if (user != id) {
      return response.status(401).json({ error: 'operation not permitted.' });
    }
    await connection('user').where('id', id).delete();
    return response.status(204).send();
  }

}
