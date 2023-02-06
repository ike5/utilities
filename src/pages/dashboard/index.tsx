import React, { useEffect, useRef, useState } from 'react';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import {
	createServerSupabaseClient,
	Session,
	User,
} from '@supabase/auth-helpers-nextjs';
import BasicAvatar from './BasicAvatar';
import { Sidebar } from './sidebar';
import Sidebar2 from './sidebar2';
import BaseHero from 'components/BaseHero';

export default function Dashboard({
	session,
	user,
}: {
	session: Session;
	user: User;
}) {
	const supabase = useSupabaseClient();
	const [loading, setLoading] = useState(true);
	const [username, setUsername] = useState(null);
	const [website, setWebsite] = useState(null);
	const [avatar_url, setAvatarUrl] = useState(null);

	useEffect(() => {
		getProfile();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [session]);

	async function signOut() {
		alert(`Signed out user: ${user.id}`);
		await supabase.auth.signOut();
	}

	async function getProfile() {
		try {
			setLoading(true);

			let { data, error, status } = await supabase
				.from('profiles')
				.select(`username, website, avatar_url`)
				.eq('id', user.id)
				.single();

			if (error && status !== 406) {
				throw error;
			}

			if (data) {
				setUsername(data.username);
				setWebsite(data.website);
				setAvatarUrl(data.avatar_url);
			}
		} catch (error) {
			alert('Error loading user data!');
			console.log(error);
		} finally {
			setLoading(false);
		}
	}

	return (
		// <div className='container-grid'>
		// 	<BaseHero user={user} session={session} />
		// 	<Sidebar signOut={signOut} />
		// </div>
		<div className='flex'>
			<aside className='flex-auto'>
				<Sidebar2 />
			</aside>
			<main className='flex flex-auto'>Hello</main>
		</div>
	);
}

export const getServerSideProps = async (ctx: any) => {
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

	return {
		props: {
			initialSession: session,
			user: session.user,
		},
	};
};
