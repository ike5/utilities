'use client';
import React from 'react';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';

export default function UserManagement({ user }: any) {
	return (
		<>
			<h1>Welcome, you are signed in!</h1>
			<div>{/* <pre>{JSON.stringify(props, null, 2)}</pre> */}</div>
			<div>
				<Link href='/'>Home</Link>
			</div>
		</>
	);
}

export const getServerSideProps = async (ctx: any) => {
	// create authenticated Supabase Client
	const supabase = createServerSupabaseClient(ctx);

	// check if we have a session
	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (!session) {
		return {
			redirect: {
				destination: '/error',
				permanent: false,
			},
		};
	}

	return {
		props: {
			initialSession: session,
			user: session.user,
		},
	};
};
