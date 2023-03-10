import {
    Box,
    Checkbox,
    Divider,
    Drawer,
    IconButton,
    Input,
    ListItemIcon,
    ListItemText,
    MenuItem,
    MenuList,
    Toolbar,
    Typography,
} from "@mui/material"
import SettingsIcon from "@mui/icons-material/Settings"
import useCheckbox from "../../hooks/useCheckbox"
import PopupMenu, { PopupMenuClose } from "../../commons/PopupMenu"

import CloseIcon from "@mui/icons-material/Close"

import TourneyStartTime from "./TourneyStartTime"

import "./TourneyDrawer.css"
import TourneyAccordion from "./tourney_accordion/TourneyAccordion"
import React, { startTransition, useEffect, useRef, useState } from "react"

import ISO from "iso-639-1"
import { FixedSizeList, ListChildComponentProps } from "react-window"

import FilterOptionsSelection from "./FilterOptionsSelection"
import TourneyAccordions from "./tourney_accordion"

const TourneyDrawer = () => {
    const [selectedGames, setSelectedGames] = useState()
    const [tourneyNameFilter, setTourneyNameFilter] = useState("")

    const [filterOptionsViewOpen, setFilterOptionsViewOpen] = useState(false)

    const handleTourneyNameFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        startTransition(() => {
            setTourneyNameFilter(event.target.value)
        })
    }

    const handleSettingsViewVisibility = () => {
        setFilterOptionsViewOpen(!filterOptionsViewOpen)
    }

    return (
        <Drawer
            PaperProps={{ sx: { width: "25%" } }}
            variant="permanent"
            anchor="left"
        >
            <Toolbar />
            <Divider />
            <Box className="drawer-container">
                <Box>
                    <Typography variant="h4">Tournaments</Typography>
                    <Box paddingTop={3}>
                        <Typography variant="body1">Filters:</Typography>
                        <Box
                            alignItems="center"
                            display="flex"
                            flexDirection="row"
                            paddingTop={1}
                            gap={1}
                        >
                            <Box paddingTop={1}>
                                <PopupMenu
                                    buttonProps={{
                                        buttonText: "Games",
                                    }}
                                    menuContent={<GameSelectionMenuContent />}
                                />
                            </Box>
                            <Input
                                disabled={filterOptionsViewOpen}
                                placeholder="Tournament name"
                                onChange={handleTourneyNameFilterChange}
                                value={tourneyNameFilter}
                                endAdornment={
                                    <IconButton
                                        onClick={() => setTourneyNameFilter("")}
                                        sx={{
                                            visibility: tourneyNameFilter ? "visible" : "hidden",
                                        }}
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                }
                            />
                            <Box flexGrow={1} />
                            <Box marginTop={1}>
                                <IconButton onClick={handleSettingsViewVisibility}>
                                    {filterOptionsViewOpen ? (
                                        <CloseIcon fontSize="medium" />
                                    ) : (
                                        <SettingsIcon fontSize="medium" />
                                    )}
                                </IconButton>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Divider />
            {filterOptionsViewOpen ? (
                <FilterOptionsSelection />
            ) : (
                <TourneyAccordions tourneyNameFilter={tourneyNameFilter} />
            )}
        </Drawer>
    )
}

const GameSelectionMenuContent = () => {
    const apexCheckbox = useCheckbox()
    const starcraftCheckbox = useCheckbox()

    return (
        <MenuList>
            <MenuItem onClick={apexCheckbox.handleToggle}>
                <ListItemIcon>
                    <SettingsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Apex Legends</ListItemText>
                <Checkbox checked={apexCheckbox.checked} />
            </MenuItem>
            <MenuItem onClick={starcraftCheckbox.handleToggle}>
                <ListItemIcon>
                    <SettingsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>StarCraft 2</ListItemText>
                <Checkbox checked={starcraftCheckbox.checked} />
            </MenuItem>
        </MenuList>
    )
}

interface MenuItemGameProps {
    gameId: string
    displayName: string
}

const MenuItemGame = ({ gameId, displayName }: MenuItemGameProps) => {
    const gameCheckbox = useCheckbox()

    return (
        <MenuItem>
            <ListItemIcon>
                <SettingsIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>{displayName}</ListItemText>
        </MenuItem>
    )
}

export default TourneyDrawer
