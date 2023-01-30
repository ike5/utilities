import React, { useEffect, useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import Image from 'next/image';

export default function Avatar({ user, url, size }) {
	const supabase = useSupabaseClient();
	const [avatarUrl, setAvatarUrl] = useState(null);
	const [uploading, setUploading] = useState(false);

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
					<div className='w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2'>
						<Image
							width={150}
							height={150}
							src={avatarUrl}
							alt='Avatar'
						/>
					</div>
				</div>
			) : (
				<div
					className='avatar no-image'
					style={{ height: size, width: size }}
				/>
			)}
			<div style={{ width: size }}>
				<label className='' htmlFor='single'>
					<h1>{user.email}</h1>
				</label>
			</div>
		</div>
	);
}
