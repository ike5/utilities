import React, { useState } from 'react';
import Link from 'next/link';
import {
	IoHomeOutline,
	IoAccessibilityOutline,
	IoChatboxEllipsesOutline,
	IoCogOutline,
	IoExitOutline,
	IoHelpCircleOutline,
	IoLinkOutline,
	IoPeopleCircleOutline,
} from 'react-icons/io5';

export function Sidebar({ signOut }: { signOut: () => void }) {
	const [className, setClassName] = useState('active');
	const [activeIndex, setActiveIndex] = useState(null);

	const onClickActiveLink = (index: any) => {
		setActiveIndex(index);
		setClassName('');
	};

	return (
		<div className='side'>
			<div className='navigation'>
				<ul className=''>
					<li
						onClick={() => onClickActiveLink(0)}
						className={
							activeIndex === 0
								? `active list`
								: `${className} list`
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
						className={activeIndex === 1 ? `active list` : `list`}
					>
						<Link href='/'>
							<span className='icon'>
								<IoAccessibilityOutline />
							</span>
							<span className='title'>Profile</span>
						</Link>
					</li>

					<li
						onClick={() => onClickActiveLink(2)}
						className={activeIndex === 2 ? `active list` : `list`}
					>
						<Link href='/messages'>
							<span className='icon'>
								<IoChatboxEllipsesOutline />
							</span>
							<span className='title'>Messages</span>
						</Link>
					</li>

					<li
						onClick={() => onClickActiveLink(3)}
						className={activeIndex === 3 ? `active list` : `list`}
					>
						<Link href='help'>
							<span className='icon'>
								<IoHelpCircleOutline />
							</span>
							<span className='title'>Help</span>
						</Link>
					</li>

					<li
						onClick={() => onClickActiveLink(4)}
						className={activeIndex === 4 ? `active list` : `list`}
					>
						<Link href='help'>
							<span className='icon'>
								<IoLinkOutline />
							</span>
							<span className='title'>Link Library</span>
						</Link>
					</li>
					<li
						onClick={() => onClickActiveLink(5)}
						className={activeIndex === 5 ? `active list` : `list`}
					>
						<Link href='help'>
							<span className='icon'>
								<IoPeopleCircleOutline />
							</span>
							<span className='title'>My Students</span>
						</Link>
					</li>

					<li
						onClick={() => onClickActiveLink(6)}
						className={activeIndex === 6 ? `active list` : `list`}
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
		</div>
	);
}
