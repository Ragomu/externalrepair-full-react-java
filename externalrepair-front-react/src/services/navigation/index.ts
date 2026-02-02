import { navigate } from 'vike/client/router';
import { Routes } from '~/routes';

export const navigateTo = (route: Routes) => navigate(route);
