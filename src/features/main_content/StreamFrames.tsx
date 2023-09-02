import { memo } from "react"
import { Box } from "@mui/material"
import getStreamDimensions from "./streamDimensions"
import StreamFrameContainer from "./StreamFrameContainer"
import { useStreamsState } from "../../commons/streamsState"

const StreamFrames = () => {
    const { streams } = useStreamsState()

    return (
        <Box
            display="flex"
            flexDirection="row"
            flexWrap="wrap"
            height="100%"
            overflow="auto"
        >
            {streams.map((stream, index) => {
                const { width, height } = getStreamDimensions(
                    streams.length,
                    stream.displayPosition
                )

                return (
                    <Box
                        key={index}
                        height={`${height}%`}
                        order={stream.displayPosition}
                        overflow="hidden"
                        width={`${width}%`}
                    >
                        <StreamFrameContainer channel={stream.channelName} />
                    </Box>
                )
            })}
        </Box>
    )
}

export default memo(StreamFrames)
