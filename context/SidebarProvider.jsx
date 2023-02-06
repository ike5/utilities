import React, { createContext, useState } from 'react';

export const MyContext = createContext();

const SidebarProvider = ({ children }) => {
	const [value, setValue] = useState('initial value');

	return (
		<MyContext.Provider value={{ value, setValue }}>
			{children}
		</MyContext.Provider>
	);
};

export default SidebarProvider;
