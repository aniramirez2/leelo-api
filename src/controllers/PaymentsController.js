const connection = require('../database/connection');
const generateUniqueId = require('../utils/generateUniqueId')

module.exports = {
  async create(request, response) {
    const { name, creditCard, cvc, value, brand, hash } = request.body;
    const id = generateUniqueId();

    await connection('payments').insert({
      id,
      creditCard,
      cvc,
      value,
      brand,
      name,
      hash
    });
    return response.json({ id })
  },

  async index(request, response) {
    const payments = await connection('payments').select('*');
    return response.json(payments);
  },

  async delete(rquest, response) {
    const { id } = request.params;

    const user = await connection('payments')
      .where('id', id)
      .first()

    if (user != id) {
      return response.status(401).json({ error: 'operation not permitted.' });
    }
    await connection('payments').where('id', id).delete();
    return response.status(204).send();
  }

}
