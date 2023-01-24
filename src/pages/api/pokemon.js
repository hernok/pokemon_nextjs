import { sequelize } from 'model/connection';
import { Pokemon } from 'model/pokemon.model';

export default async function handler(req, res) {
	const name = req.query.name;
	console.log('QUERY', req.query.name);
	await sequelize.sync();
	const test = await Pokemon.create({
		name
	});

	res.status(200).json(test);
}
