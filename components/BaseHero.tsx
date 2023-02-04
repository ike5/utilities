import React from 'react';
import ClassLinks from './ClassLinks';

function BaseHero() {
	return (
		<main className='main'>
			<div className='hero min-h-screen bg-base-200'>
				<div className='hero-content text-center'>
					<div className='max-w-sm'>
						<h1 className='text-5xl font-bold'>Hello there</h1>
						<p className='py-6'>
							Provident cupiditate voluptatem et in. Quaerat
							fugiat ut assumenda excepturi exercitationem quasi.
							In deleniti eaque aut repudiandae et a id nisi.
						</p>
						<ClassLinks />
					</div>
				</div>
			</div>
		</main>
	);
}

export default BaseHero;
