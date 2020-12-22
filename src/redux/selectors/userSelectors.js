import { createSelector } from 'reselect';

const getEnableSidebar = (state) => {
	return state.userReducer.enableSidebar;
};

export const getEnableSidebarSelector = createSelector(
	[getEnableSidebar],
	(getEnableSidebar) => {
		return getEnableSidebar;
	}
);
