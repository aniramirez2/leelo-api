const connection = require('../database/connection');

module.exports = {
  async create(request, response) {
    const { title, author, genre, status, pages, language } = request.body;

    const [id] = await connection('books').insert({
      title,
      author,
      genre,
      status,
      pages,
      language
    });
    return response.json({ id })
  },

  async index(request, response) {
    const { page = 1 } = request.query;
    const [count] = await connection('books').count();
    const books = await connection('books')
      .limit(5)
      .offset((page -1 ) * 5)
      .select('*');
    response.header('X-Total-Count', count['count(*)'])
    return response.json(books);
  },

  async delete(rquest, response) {
    const { id } = request.params;

    const book = await connection('books')
      .where('id', id)
      .first()

    if (book != id) {
      return response.status(401).json({ error: 'operation not permitted.' });
    }
    await connection('books').where('id', id).delete();
    return response.status(204).send();
  }
}
