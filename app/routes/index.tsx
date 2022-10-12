import {useOptionalUser} from '~/hooks/useUser';
import Layout from '~/layout/Layout';

export default function Index() {
	const user = useOptionalUser();
	console.log(user);
	return (
		<Layout>
			<h1>Welcome to Software A EYE</h1>
		</Layout>
	);
}
