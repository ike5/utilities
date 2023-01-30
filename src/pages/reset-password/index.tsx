import React from 'react';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import Link from 'next/link';

const PasswordReset = (props: any) => {
	const supabase = useSupabaseClient();
	const [email, setEmail] = React.useState('');

	async function sendResetEmail() {
		let { data, error } = await supabase.auth.resetPasswordForEmail(email);
		console.log(data, error);
		if(data){
			alert('Email sent! Check your inbox.')
		}
	}

	return (
		<>
			<div className='hero min-h-screen bg-base-200'>
				<div className='hero-content flex-col lg:flex-row-reverse'>
					<div className='text-center lg:text-left'>
						<h1 className='text-5xl font-bold'>Reset Password</h1>
					</div>
					<div className='card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100'>
						<div className='card-body'>
							<div className='form-control'>
								<label className='label'>
									<span className='label-text'>Email</span>
								</label>
								<input
									onChange={(e) => {
										setEmail(e.target.value);
									}}
									type='text'
									placeholder='email'
									className='input input-bordered'
								/>
							</div>

							<div className='form-control mt-6'>
								<button
									onClick={sendResetEmail}
									className='btn btn-primary'
								>
									Send
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Link href='/'>Home</Link>
		</>
	);
};

export default PasswordReset;
