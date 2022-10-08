import React from 'react';
import { Outlet } from '@remix-run/react';
import Layout from '~/layout/Layout';

const __Auth = () => {
	return (
		<Layout>
			<Outlet/>
		</Layout>
	);
};

export default __Auth;
