import React from 'react';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
function SignUp() {
	const supabase = useSupabaseClient();
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');

	async function signUpHandler() {
		let { data, error } = await supabase.auth.signUp({
			email: email,
			password: password,
		});
		if (data) {
			console.log(data);
			alert('User created!');
		}
		if (error) {
			console.log(error);
			alert('Error creating user!');
		}
	}

	return (
		<>
			<div className='hero min-h-screen bg-base-200'>
				<div className='hero-content flex-col lg:flex-row-reverse'>
					<div className='text-center lg:text-left'>
						<h1 className='text-5xl font-bold'>Login now!</h1>
						<p className='py-6'>
							Provident cupiditate voluptatem et in. Quaerat
							fugiat ut assumenda excepturi exercitationem quasi.
							In deleniti eaque aut repudiandae et a id nisi.
						</p>
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
							<div className='form-control'>
								<label className='label'>
									<span className='label-text'>Password</span>
								</label>
								<input
									onChange={(e) => {
										setPassword(e.target.value);
									}}
									type='text'
									placeholder='password'
									className='input input-bordered'
								/>
							</div>

							<div className='form-control mt-6'>
								<button
									onClick={signUpHandler}
									className='btn btn-primary'
								>
									Create User
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default SignUp;
