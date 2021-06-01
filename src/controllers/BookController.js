const connection = require('../database/connection');

module.exports = {
  async create(request, response) {
    const { title, author, genre, status, pages, language, review, score, editorial, bookLayer } = request.body;

    const [id] = await connection('book').insert({
      title,
      author,
      genre,
      status,
      pages,
      language,
      review,
      score,
      editorial,
      bookLayer
    });

    return response.json({ id })

  },

  async index(request, response) {
    const books = await connection('book')
      .select('*');
    return response.json(books);
  },

  async delete(request, response) {
    const { id } = request.params;

    const book = await connection('book')
      .where('id', id)
      .first()

    if (book != id) {
      return response.status(401).json({ error: 'operation not permitted.' });
    }
    await connection('books').where('id', id).delete();
    return response.status(204).send();
  },

  async update(request, response) {
    const { id, title, author, genre, status, pages, language, review, score, editorial, bookLayer} = request.body;

    const reponse = await connection('book').update({
      title,
      author,
      genre,
      status,
      pages,
      language,
      review,
      score,
      editorial,
      bookLayer
    }).where({id});
    return response.json({ reponse })
  },
}
