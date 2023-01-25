import {
	User,
	createServerSupabaseClient,
} from '@supabase/auth-helpers-nextjs';
import { GetServerSidePropsContext } from 'next';
import Link from 'next/link';

export default function ProtectedPage({
	user,
	data,
	initialSession,
}: {
	user: User;
	data: any;
	initialSession: any;
}) {
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
