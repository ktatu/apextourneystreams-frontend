import React, { useContext, useRef } from "react"
import { Box, Button, IconButton, Paper, Typography } from "@mui/material"
import ReplayIcon from "@mui/icons-material/Replay"
import CloseIcon from "@mui/icons-material/Close"
import useChannels from "../../hooks/useChannels"
import useQueryParams from "../../hooks/useQueryParams"
import { useStreamContext } from "../../commons/streamReducer"

const StreamFrames = () => {
    const channels = useQueryParams("channel")
    const { streamState } = useStreamContext()

    return (
        <Box
            display="flex"
            flexDirection="row"
            flexWrap="wrap"
            paddingLeft={1}
            gap={1}
        >
            {streamState.streams.map((channel: string) => (
                <StreamFrameContainer
                    key={channel}
                    channel={channel}
                />
            ))}
        </Box>
    )
}

interface StreamFrameContainerProps {
    channel: string
}

const StreamFrameContainer = ({ channel }: StreamFrameContainerProps) => {
    const { removeStream } = useStreamContext()
    const iframeRef = useRef<HTMLIFrameElement>(null)

    const handleStreamReload = () => {
        if (iframeRef.current) {
            // https://stackoverflow.com/questions/86428/what-s-the-best-way-to-reload-refresh-an-iframe/4062084#4062084
            // eslint-disable-next-line no-self-assign
            iframeRef.current.src = iframeRef.current.src
        }
    }

    const handleStreamClose = () => {
        removeStream(channel)
    }

    return (
        <Paper elevation={10}>
            <Box
                display="flex"
                flexDirection="column"
                maxWidth="500px"
                maxHeight="340px"
            >
                <Box
                    display="flex"
                    flexDirection="row"
                    height="40px"
                >
                    <Typography
                        marginLeft={1}
                        marginTop={1}
                        sx={{ flexGrow: 1 }}
                    >
                        {channel}
                    </Typography>
                    <IconButton onClick={handleStreamReload}>
                        <ReplayIcon />
                    </IconButton>
                    <IconButton onClick={handleStreamClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Box>
                    <iframe
                        ref={iframeRef}
                        src={`https://player.twitch.tv/?channel=${channel}&muted=true&parent=localhost`}
                        style={{ border: 0 }}
                        height="300px"
                        width="500px"
                        title="stream"
                        allowFullScreen
                    ></iframe>
                </Box>
            </Box>
        </Paper>
    )
}

export default StreamFrames
