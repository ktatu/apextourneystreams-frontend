import React, { useState } from "react"
import IconButton from "@mui/material/IconButton"
import { Button } from "@mui/material"
import Menu from "@mui/material/Menu"
import Box from "@mui/material/Box"
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

const PopupMenu = ({
    buttonProps,
    menuContent,
}: {
    buttonProps: ButtonProps
    menuContent: JSX.Element
}) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const isOpen = Boolean(anchorEl)

    const handleClick: MouseEventHandler = (event: React.MouseEvent<HTMLElement>): void => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <Box>
            <OpenMenuButton
                handleClick={handleClick}
                buttonProps={buttonProps}
            />
            <Menu
                anchorEl={anchorEl}
                open={isOpen}
                onClose={handleClose}
            >
                {menuContent}
            </Menu>
        </Box>
    )
}

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
                onClick={handleClick}
                endIcon={buttonProps.buttonIcon}
            >
                {buttonProps.buttonIcon}
            </Button>
        )
    } else if (isIconButtonProps(buttonProps)) {
        return <IconButton onClick={handleClick}>{buttonProps.buttonIcon}</IconButton>
    } else if (isTextButtonProps(buttonProps)) {
        return <Button onClick={handleClick}>{buttonProps.buttonText}</Button>
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
