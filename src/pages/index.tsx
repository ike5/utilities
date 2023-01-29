import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import styles from '@/styles/Home.module.css';
import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import Accounts from '../../components/Accounts';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
	const session = useSession();
	const supabase = useSupabaseClient();
	return (
		<>
			<Head>
				<title>Tutorworks</title>
				<meta
					name='description'
					content='Generated by create next app'
				/>
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1'
				/>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<div>
				{!session ? (
					<Auth
						supabaseClient={supabase}
						appearance={{ theme: ThemeSupa }}
						theme='dark'
					/>
				) : (
					<Accounts session={session} />
				)}
			</div>
		</>
	);
}
