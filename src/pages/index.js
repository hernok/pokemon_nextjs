import { Inter } from '@next/font/google';
import { useEffect, useState } from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';

export default function Home({ pokemon }) {
	const [list, setList] = useState([]);
	const [favourite, setFavourite] = useState(false);

	useEffect(() => {
		fetch('/api/list')
			.then((res) => res.json())
			.then((databaseList) => {
				setList(databaseList);
			});
	}, [favourite]);

	const addFavourite = async (pokemon) => {
		setFavourite(false);
		await fetch(`http://localhost:3000/api/pokemon?name=${pokemon}`, {
			method: 'GET'
		});
		// .then((data) => data.json()) // Parsing the data into a JavaScript object
		// .then((json) => alert(JSON.stringify(json)));
		console.log(pokemon, 'was added to favourites!');
		setFavourite(true);

		//Add a function that inputs curl http://localhost:3000/api/pokemon?name=squirtle
	};
	const removeFavourite = async (pokemon) => {
		setFavourite(false);
		await fetch(`http://localhost:3000/api/remove?name=${pokemon}`, {
			method: 'GET'
		});
		console.log(pokemon, 'was removed from favourites!');
		setFavourite(true);
	};

	return (
		<>
			<div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
				<div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
					<p>Index</p>

					<div className='mt-6'>
						<div className='relative'>
							<div className='absolute inset-0 flex items-center'>
								<div className='w-full border-t border-gray-300' />
							</div>
							<div className='relative flex justify-center text-sm'>
								<span className='bg-white px-2 text-gray-500'>A divider</span>
							</div>
						</div>

						<div className='mt-6 grid grid-cols-3 gap-3'>
							<div>
								<ul>
									{pokemon?.results.map((pokemon) => (
										<li key={pokemon.name}>
											<Link
												href={`/${pokemon.name}`}
												className='hover:text-blue-500'
											>
												{pokemon.name.charAt(0).toUpperCase() +
													pokemon.name.slice(1)}
											</Link>{' '}
											{list.find((item) => pokemon.name === item.name) ? (
												<span
													className='favourite-star'
													onClick={() => removeFavourite(pokemon.name)}
												>
													⭐️
												</span>
											) : (
												<span
													className='favourite-star'
													onClick={() => addFavourite(pokemon.name)}
												>
													✩
												</span>
											)}
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export async function getStaticProps() {
	const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=2000');
	const pokemon = await res.json();

	return {
		props: {
			pokemon
		}
	};
}
