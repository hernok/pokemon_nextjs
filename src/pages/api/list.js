import { Pokemon } from 'model/pokemon.model';
import { sequelize } from 'model/connection';

export default async function handler(req, res) {
	await sequelize.sync();
	const pokemon = await Pokemon.findAll();

	res.status(200).json(pokemon);
}
