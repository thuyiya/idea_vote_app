import { Box, Drawer, List, ListItemButton, ListItemText, Toolbar } from '@mui/material';
import Link from 'next/link';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Box sx={{ display: 'flex' }}>
            {/* Sidebar */}
            <Drawer
                variant="permanent"
                sx={{
                    width: 240,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        <Link href="/dashboard">
                            <ListItemButton>
                                <ListItemText primary="Home" />
                            </ListItemButton>
                        </Link>
                        <Link href="/dashboard/user-management">
                            <ListItemButton>
                                <ListItemText primary="User Management" />
                            </ListItemButton>
                        </Link>
                        <Link href="/dashboard/idea-management">
                            <ListItemButton>
                                <ListItemText primary="Idea Management" />
                            </ListItemButton>
                        </Link>
                        <Link href="/dashboard/settings">
                            <ListItemButton>
                                <ListItemText primary="Settings" />
                            </ListItemButton>
                        </Link>
                    </List>
                </Box>
            </Drawer>

            {/* Main Content */}
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                {children}
            </Box>
        </Box>
    );
}