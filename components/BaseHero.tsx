import Avatar from '@/pages/dashboard/BasicAvatar';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import {
	Session,
	User,
	useSession,
	useSupabaseClient,
} from '@supabase/auth-helpers-react';
import React, { useEffect, useState } from 'react';
import ClassLinks from './ClassLinks';

export default function BaseHero({
	user,
	session,
}: {
	user: User;
	session: Session;
}) {
	const supabase = useSupabaseClient();
	const [loading, setLoading] = useState(true);
	const [username, setUsername] = useState(null);
	const [avatar_url, setAvatarUrl] = useState(null);

	useEffect(() => {
		getProfile();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [session]);
	async function getProfile() {
		try {
			setLoading(true);

			let { data, error, status } = await supabase
				.from('profiles')
				.select(`username,  avatar_url`)
				.eq('id', user.id)
				.single();

			if (error && status !== 406) {
				throw error;
			}

			if (data) {
				setUsername(data.username);
				setAvatarUrl(data.avatar_url);
			}
		} catch (error) {
			alert('Error loading user data!');
			console.log(error);
		} finally {
			setLoading(false);
		}
	}

	const [hours, setHours] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(0);
	const [ampm, setAmpm] = useState('AM');

	function showTime() {
		const date = new Date();
		const [month, day, year] = [
			date.getMonth(),
			date.getDate(),
			date.getFullYear(),
		];
		const [hour, minutes, seconds] = [
			date.getHours(),
			date.getMinutes(),
			date.getSeconds(),
		];

		setHours(hour % 12 || 12);
		setMinutes(minutes);
		setSeconds(seconds);
		setAmpm(hour >= 12 ? 'PM' : 'AM');
	}

	setInterval(showTime, 1000);

	return (
		<main className='main'>
			<div className='dashboard-grid'>
				<div className='clock'>
					<div className='grid grid-flow-col gap-5 text-center auto-cols-max'>
						<span className='countdown font-mono text-5xl'>
							<span style={{ '--value': hours }}></span>:
							<span style={{ '--value': minutes }}></span>:
							<span style={{ '--value': seconds }}></span>
						</span>
						<span className='font-mono text-5xl'>{ampm}</span>
					</div>
				</div>
				<div className='avatar'>
					<Avatar user={user} url={avatar_url} size={300} />
				</div>
				<div className='top-left-box'>
					<div className='hero'>
						<div className='hero-content text-center'>
							<div className='max-w-sm'>
								<ClassLinks />
							</div>
						</div>
					</div>
				</div>

				<div className='top-center-box'>
					<div className='hero'>
						<div className='hero-content text-center'>
							<div className='max-w-sm'>
								<ClassLinks />
							</div>
						</div>
					</div>
				</div>
				<div className='top-right-box'>
					<div className='hero'>
						<div className='hero-content text-center'>
							<div className='max-w-sm'>
								<ClassLinks />
							</div>
						</div>
					</div>
				</div>
				<div className='bottom-left-box'>
					<div className='hero'>
						<div className='hero-content text-center'>
							<div className='max-w-sm'>
								<ClassLinks />
							</div>
						</div>
					</div>
				</div>
				<div className='bottom-center-box'>
					<div className='hero'>
						<div className='hero-content text-center'>
							<div className='max-w-sm'>
								<ClassLinks />
							</div>
						</div>
					</div>
				</div>
				<div className='bottom-right-box'>
					<div className='hero'>
						<div className='hero-content text-center'>
							<div className='max-w-sm'>
								<ClassLinks />
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
