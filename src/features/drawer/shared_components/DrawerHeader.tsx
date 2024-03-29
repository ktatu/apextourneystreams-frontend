import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import CloseIcon from "@mui/icons-material/Close"
import SettingsIcon from "@mui/icons-material/Settings"
import { Box, IconButton, Stack, Typography } from "@mui/material"
import "../Drawer.css"

interface DrawerHeaderProps {
    settingsViewOpen: boolean
    showSettingsIcon?: boolean
    title: string
    handleDrawerClose: () => void
    handleSettingsView: () => void
}
const DrawerHeader = ({
    settingsViewOpen,
    showSettingsIcon,
    title,
    handleDrawerClose,
    handleSettingsView,
}: DrawerHeaderProps) => {
    return (
        <Stack
            direction="column"
            gap={4}
            paddingBottom={5}
        >
            <Box
                alignContent="center"
                display="flex"
            >
                <Typography variant="h4">{title}</Typography>
                <Box
                    display="flex"
                    gap={1}
                    marginLeft="auto"
                >
                    {showSettingsIcon && (
                        <IconButton onClick={handleSettingsView}>
                            {settingsViewOpen ? (
                                <CloseIcon fontSize="large" />
                            ) : (
                                <SettingsIcon fontSize="large" />
                            )}
                        </IconButton>
                    )}
                    <IconButton onClick={handleDrawerClose}>
                        <ArrowBackIcon fontSize="large" />
                    </IconButton>
                </Box>
            </Box>
        </Stack>
    )
}

export default DrawerHeader
