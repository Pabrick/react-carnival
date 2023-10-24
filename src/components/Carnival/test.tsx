import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Carnival from './main';

describe('Carnival component', () => {
	const mockSuccess = jest.fn(() => {});
	const mockFailure = jest.fn(() => {});
	let carnivalComp: HTMLElement;

	beforeEach(() => {
		render(
			<Carnival
				size={25}
				duration={1000}
				onSuccess={mockSuccess}
				onFailure={mockFailure}
				random={false}
			/>
		);
		carnivalComp = screen.getByTestId('carnival');
	});

	test('renders in document', () => {
		expect(carnivalComp).toBeInTheDocument();
	});

	describe('when click', () => {
		test('ON zone triggers success', () => {
			const markerComp = screen.getByTestId('marker');
			Object.defineProperty(markerComp, 'offsetLeft', {
				value: 0,
			});
			fireEvent.mouseDown(carnivalComp);
			expect(mockSuccess).toBeCalled();
		});

		test('OUT zone triggers failure', () => {
			const markerComp = screen.getByTestId('marker');
			Object.defineProperty(markerComp, 'offsetLeft', {
				value: 200,
			});
			fireEvent.mouseDown(carnivalComp);
			expect(mockFailure).toBeCalled();
		});
	});
});
