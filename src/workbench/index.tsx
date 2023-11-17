import React from 'react';
import ReactDOM from 'react-dom/client';
import Carnival from '../Carnival';
import './styles.scss';

export const Workbench = () => {
	const success = () => {
		console.info('SUCCESS!');
	};

	const fail = () => {
		console.error('Fail!');
	};

	return (
		<div className='workbench'>
			<div className='Wrapper'>
				<Carnival size={25} duration={500} onSuccess={success} onFailure={fail} random={true} />
			</div>
		</div>
	);
};

ReactDOM.createRoot(document.getElementById('workbench')!).render(
	<React.StrictMode>
		<Workbench />
	</React.StrictMode>
);
