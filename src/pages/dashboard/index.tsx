import React, { useEffect, useRef, useState } from 'react';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import {
	createServerSupabaseClient,
	Session,
	User,
} from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
import {
	IoHomeOutline,
	IoAccessibilityOutline,
	IoChatbubbleEllipsesOutline,
	IoCogOutline,
	IoExitOutline,
} from 'react-icons/io5';
import BasicAvatar from './BasicAvatar';
import { isBindingElement } from 'typescript';

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

	const className = 'list';
	const [activeIndex, setActiveIndex] = useState(null);

	const onClickActiveLink = (index: any) => {
		setActiveIndex(index);
	};

	return (
		<>
			<div className='navigation'>
				<ul className='list'>
					<li className='grid justify-center mb-8'>
						<Link href={'profile'}>
							<BasicAvatar
								user={user}
								url={avatar_url}
								size={150}
							/>
						</Link>
					</li>
					<li
						onClick={() => onClickActiveLink(0)}
						className={
							activeIndex === 0
								? `${className} active`
								: className
						}
					>
						<Link href='/'>
							<span className='icon'>
								<IoHomeOutline />
							</span>
							<span className='title'>Home</span>
						</Link>
					</li>

					<li
						onClick={() => onClickActiveLink(1)}
						className={
							activeIndex === 1
								? `${className} list active`
								: className
						}
					>
						<Link href='/profile'>
							<span className='icon'>
								<IoAccessibilityOutline />
							</span>
							<span className='title'>Profile</span>
						</Link>
					</li>

					<li
						onClick={() => onClickActiveLink(2)}
						className={
							activeIndex === 2
								? `${className} list active`
								: className
						}
					>
						<Link href='/messages'>
							<span className='icon'>
								<IoChatbubbleEllipsesOutline />
							</span>
							<span className='title'>Messages</span>
						</Link>
					</li>

					<li
						onClick={() => onClickActiveLink(3)}
						className={
							activeIndex === 3
								? `${className} list active`
								: className
						}
					>
						<Link href='/settings'>
							<span className='icon'>
								<IoCogOutline />
							</span>
							<span className='title'>Settings</span>
						</Link>
					</li>

					<li onClick={signOut} className='list'>
						<Link href='/'>
							<span className='icon'>
								<IoExitOutline />
							</span>
							<span className='title'>Sign Out</span>
						</Link>
					</li>
				</ul>
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
