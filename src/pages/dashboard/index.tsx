import React, { useEffect, useState } from 'react';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import {
	createServerSupabaseClient,
	Session,
	User,
} from '@supabase/auth-helpers-nextjs';
import BasicAvatar from '../../../components/BasicAvatar';
import Link from 'next/link';

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
		<>
			<div className='drawer drawer-mobile'>
				<input
					id='my-drawer-2'
					type='checkbox'
					className='drawer-toggle'
				/>

				<div className='drawer-content flex flex-col items-center justify-center'>
					{/* <!-- Page content here --> */}
					<label
						htmlFor='my-drawer-2'
						className='btn btn-primary drawer-button lg:hidden'
					>
						Open drawer
					</label>
				</div>
				<div className='drawer-side flex'>
					<label
						htmlFor='my-drawer-2'
						className='drawer-overlay'
					></label>
					<ul className='menu p-4 w-80 bg-base-100 text-base-content justify-start'>
						{/* <!-- Sidebar content here --> */}
						<BasicAvatar user={user} url={avatar_url} size={150} />
						<li>
							<Link href='/dashboard'>Dashboard</Link>
						</li>
						<li>
							<Link href='users'>Users</Link>
						</li>

						<li>
							<Link href='settings'>Settings</Link>
						</li>
						<li>
							<div>
								<button
									className='btn-block btn btn-primary'
									onClick={signOut}
								>
									Sign Out
								</button>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</>
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
