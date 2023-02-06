import React, { useEffect, useRef, useState } from 'react';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import {
	createServerSupabaseClient,
	Session,
	User,
} from '@supabase/auth-helpers-nextjs';
import Sidebar from './Sidebar';
import Messenger from 'components/messenger';
import SidebarProvider from 'context/SidebarProvider';
import BaseHero from 'components/BaseHero';
import Main from 'components/Main';

export default function Dashboard({
	session,
	user,
}: {
	session: Session;
	user: User;
}) {
	return (
		<div className='flex'>
			<SidebarProvider>
				<aside className='flex-1'>
					<Sidebar user={user} session={session} />
				</aside>
				<main className='flex-1'>
					<Main />
				</main>
			</SidebarProvider>
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
