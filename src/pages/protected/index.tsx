import {
	User,
	createServerSupabaseClient,
} from '@supabase/auth-helpers-nextjs';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ProtectedPage({
	user,
	data,
	initialSession,
}: {
	user: User;
	data: any;
	initialSession: any;
}) {
	const supabase = useSupabaseClient();
	const [avatarUrl, setAvatarUrl] = useState('');
	useEffect(() => {
		if (data[0].avatar_url) {
			downloadImage(data[0].avatar_url);
			console.log('ran useEffect');
		}
	}, [data[0].avatar_url]);

	async function downloadImage(path: any) {
		try {
			const { data, error } = await supabase.storage
				.from('avatars')
				.download(path);
			if (error) {
				throw error;
			}
			const url = URL.createObjectURL(data);
			setAvatarUrl(url);
		} catch (error) {
			console.log('Error downloading image: ', error);
		}
	}

	return (
		<>
			<div>Protected content for {user.email}</div>
			<h1>Data</h1>
			<pre>{JSON.stringify(data, null, 8)}</pre>
			<h1>User</h1>
			<pre>{JSON.stringify(user, null, 8)}</pre>
			<h1>Initial Session</h1>
			<pre>{JSON.stringify(initialSession, null, 8)}</pre>
			<Link href='/'>
				<button>Home</button>
			</Link>
			<Link href='/login'>
				<Image
					src={avatarUrl}
					alt='Avatar'
					className='avatar image'
					width={100}
					height={100}
				/>
			</Link>
		</>
	);
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
	// Create authenticated Supabase Client
	const supabase = createServerSupabaseClient(ctx);
	// Check if we have a session
	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (!session)
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};

	// Run queries with RLS on the server
	const { data } = await supabase.from('profiles').select('*');

	return {
		props: {
			initialSession: session,
			user: session.user,
			data: data ?? [],
		},
	};
};
