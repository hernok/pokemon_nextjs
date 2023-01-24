import Image from 'next/image';
import Link from 'next/link';

export default function Pokemon({ pokemon }) {
	console.log(pokemon);

	return (
		<>
			<div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
				<div className='bg-white py-8 px-4 sm:rounded-lg sm:px-10'>
					<div className='mt-6 grid grid-cols-1 shadow-xl shadow-slate-300 gap-3 justify-content w-full flex-auto transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300'>
						<h3 className='text-2xl text-center'>
							{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
						</h3>
						{pokemon.sprites.front_default && (
							<Image
								className='justify-self-center'
								src={pokemon.sprites.front_default}
								width='192'
								height='192'
								alt={pokemon.name}
							/>
						)}
					</div>
				</div>
				<Link
					className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded-none'
					href='/'
				>
					<button>Back</button>
				</Link>
			</div>
		</>
	);
}

export async function getStaticProps({ params }) {
	const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${params?.id}`);
	const pokemon = await res.json();

	return {
		props: {
			pokemon
		}
	};
}

export async function getStaticPaths() {
	const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=2000');
	const pokemon = await res.json();

	const paths =
		pokemon?.results.map((pokemon) => ({
			params: {
				id: pokemon.name
			}
		})) || [];

	return { paths, fallback: 'blocking' };
}
