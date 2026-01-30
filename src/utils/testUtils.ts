import { type RenderOptions, render } from '@testing-library/react';
import type { ReactElement } from 'react';

export const renderComponent = (
	component: ReactElement,
	options?: RenderOptions
) => {
	return render(component, options);
};

export const checkGridLoaded = (gridElement: HTMLElement): boolean => {
	const rows = gridElement.querySelectorAll('.ag-row');
	return rows.length > 0;
};

export const checkColumnCount = (
	gridElement: HTMLElement,
	expectedCount: number
): boolean => {
	const columnCount = gridElement.getAttribute('aria-colcount');
	return Number(columnCount) === expectedCount;
};

export const checkFiltersEnabled = (gridElement: HTMLElement): boolean => {
	return gridElement.querySelectorAll('.ag-floating-filter').length > 0;
};
