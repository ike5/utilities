import React, { useEffect, useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import Image from 'next/image';

export default function Avatar({ user, url }) {
	const supabase = useSupabaseClient();
	const [avatarUrl, setAvatarUrl] = useState(null);

	useEffect(() => {
		if (url) downloadImage(url);
	}, [url]);

	async function downloadImage(path) {
		try {
			const { data, error } = await supabase.storage
				.from('avatars')
				.download(path);
			if (error) {
				throw error;
			}
			const url = URL.createObjectURL(data);
			setAvatarUrl(url);
			console.log(user);
		} catch (error) {
			console.log('Error downloading image: ', error);
		}
	}

	return (
		<div>
			{avatarUrl ? (
				<div className='avatar'>
					<div className='w-16 rounded'>
						<Image
							width={75}
							height={75}
							src={avatarUrl}
							alt='Avatar'
							className='rounded-full w-12'
						/>
					</div>
				</div>
			) : (
				<div
					className='avatar no-image'
					style={{ height: 75, width: 75 }}
				/>
			)}
			{/* <div style={{ width: size }}>
				<label className='' htmlFor='single'>
					<h1>{user.email}</h1>
				</label>
			</div> */}
		</div>
	);
}
