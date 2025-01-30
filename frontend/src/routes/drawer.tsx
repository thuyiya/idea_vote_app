import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';

const navigationItems = [
    {
        label: 'Dashboard',
        icon: <DashboardIcon />,
        route: '/',
    },
    {
        label: 'Idea Manage',
        icon: <TipsAndUpdatesIcon />,
        route: '/idea',
    },
];

const secondaryNavigationItems = [
    {
        label: 'Manage Accounts',
        icon: <ManageAccountsIcon />,
        route: '/user',
    },
    {
        label: 'Settings',
        icon: <SettingsIcon />,
        route: '/settings',
    },
];

export {
    navigationItems,
    secondaryNavigationItems
}