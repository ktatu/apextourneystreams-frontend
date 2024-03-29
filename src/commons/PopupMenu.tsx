/* eslint-disable react/display-name */
import { Button } from "@mui/material"
import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"
import Menu from "@mui/material/Menu"
import React, { forwardRef, useImperativeHandle, useState } from "react"
import { MouseEventHandler } from "../types"

type ButtonProps = IconButtonProps | TextAndIconButtonProps | TextButtonProps

type IconButtonProps = {
    buttonIcon: JSX.Element
}

type TextAndIconButtonProps = {
    buttonIcon: JSX.Element
    buttonText: string
}

type TextButtonProps = {
    buttonText: string
}

type PopupMenuProps = {
    buttonProps: ButtonProps
    children: JSX.Element
}

export interface PopupMenuClose {
    handleClose: () => void
}

const PopupMenu = forwardRef<PopupMenuClose, PopupMenuProps>(({ buttonProps, children }, ref) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const isOpen = Boolean(anchorEl)

    const handleClick: MouseEventHandler = (event: React.MouseEvent<HTMLElement>): void => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    useImperativeHandle(ref, () => {
        return {
            handleClose,
        }
    })

    return (
        <Box>
            <OpenMenuButton
                buttonProps={buttonProps}
                handleClick={handleClick}
            />
            <Menu
                anchorEl={anchorEl}
                open={isOpen}
                onClose={handleClose}
            >
                {children}
            </Menu>
        </Box>
    )
})

const OpenMenuButton = ({
    buttonProps,
    handleClick,
}: {
    buttonProps: ButtonProps
    handleClick: MouseEventHandler
}): JSX.Element => {
    if (isTextAndIconButtonProps(buttonProps)) {
        return (
            <Button
                endIcon={buttonProps.buttonIcon}
                variant="contained"
                sx={{
                    maxWidth: "200px",
                }}
                onClick={handleClick}
            >
                <Box
                    overflow="hidden"
                    textOverflow="ellipsis"
                    whiteSpace="nowrap"
                >
                    {buttonProps.buttonText}
                </Box>
            </Button>
        )
    } else if (isIconButtonProps(buttonProps)) {
        return <IconButton onClick={handleClick}>{buttonProps.buttonIcon}</IconButton>
    } else if (isTextButtonProps(buttonProps)) {
        return (
            <Button
                sx={{ maxWidth: "200px", overflow: "hidden" }}
                variant="contained"
                onClick={handleClick}
            >
                {buttonProps.buttonText}
            </Button>
        )
    }
    return <Button>Click</Button>
}

const isTextAndIconButtonProps = (props: ButtonProps): props is TextAndIconButtonProps => {
    try {
        return (
            (props as TextAndIconButtonProps).buttonText !== undefined &&
            (props as TextAndIconButtonProps).buttonIcon !== undefined
        )
    } catch {
        return false
    }
}

const isIconButtonProps = (props: ButtonProps): props is IconButtonProps => {
    try {
        return (props as IconButtonProps).buttonIcon !== undefined
    } catch {
        return false
    }
}

const isTextButtonProps = (props: ButtonProps): props is TextButtonProps => {
    try {
        return (props as TextButtonProps).buttonText !== undefined
    } catch {
        return false
    }
}

export default PopupMenu
