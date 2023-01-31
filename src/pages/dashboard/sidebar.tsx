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
	IoPeopleCircleOutline
} from 'react-icons/io5';

export function Sidebar({signOut}: {signOut: () => void}) {

	const className = 'list';
	const [activeIndex, setActiveIndex] = useState(null);

	const onClickActiveLink = (index: any) => {
		setActiveIndex(index);
	};


	return <div className='navigation'>
		<ul className=''>
			<li
				onClick={() => onClickActiveLink(0)}
				className={activeIndex === 0
					? `${className} active`
					: className}
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
				className={activeIndex === 1
					? `${className} active`
					: className}
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
				className={activeIndex === 2
					? `${className} active`
					: className}
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
				className={activeIndex === 3
					? `${className}  active`
					: className}
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
				className={activeIndex === 4
					? `${className}  active`
					: className}
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
				className={activeIndex === 5
					? `${className}  active`
					: className}
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
				className={activeIndex === 6
					? `${className}  active`
					: className}
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
	</div>;
}
