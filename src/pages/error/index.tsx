import Link from 'next/link';
import React from 'react';

function error() {
	return (
		<>
			<div className='hero min-h-screen bg-base-200'>
				<div className='hero-content text-center'>
					<div className='max-w-md'>
						<h1 className='text-5xl font-bold'>404</h1>
						<p className='py-6'>
							This page does not exist. Please check the URL and
							try again.
						</p>
						<Link href='/'>
							<button className='btn btn-primary'>Go back</button>
						</Link>
					</div>
				</div>
			</div>
		</>
	);
}

export default error;
