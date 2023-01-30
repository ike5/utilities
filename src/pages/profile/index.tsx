import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';

export default function Profile({ user }: any) {
	return (
		<>
			<div>{JSON.stringify(user)}👋</div>
			<div>Email {user.email}</div>
			<div>ID {user.id}</div>
			<div>Phone {user.phone}</div>
			<div>app_metadata {JSON.stringify(user.app_metadata)}</div>
			<div>aud {user.aud}</div>
			<div>role {user.role}</div>
			<div>amr {JSON.stringify(user.amr)}</div>
			<Link href='/'>
				<button>Home</button>
			</Link>
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
				destination: '/error',
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
