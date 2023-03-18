import { AccordionDetails, Box, IconButton, Link, Tooltip, Typography } from "@mui/material"
import { StreamInfo, WebLinks } from "../types"
import HomeIcon from "@mui/icons-material/Home"
import BoyIcon from "@mui/icons-material/Boy"
import StreamInfoList from "./StreamInfoList"

interface TourneyAccordionDetailsProps {
    streamInfoArray: Array<StreamInfo>
    webLinks: WebLinks
}

const TourneyAccordionDetails = ({ streamInfoArray, webLinks }: TourneyAccordionDetailsProps) => {
    return (
        <AccordionDetails>
            <Box
                display="flex"
                flexDirection="column"
                gap={2}
            >
                <Box
                    alignItems="center"
                    display="flex"
                    flexDirection="row"
                    gap={1}
                >
                    <WebLinksWithIcons webLinks={webLinks} />
                    <Box
                        display="flex"
                        alignSelf="flex-end"
                    >
                        <Tooltip title="Total viewers">
                            <Box
                                alignItems="center"
                                display="flex"
                                flexDirection="row"
                                gap={1}
                                paddingLeft={6}
                            >
                                <Typography
                                    color="#F75750"
                                    variant="h6"
                                >
                                    1000
                                </Typography>
                                <BoyIcon sx={{ color: "#F75750" }} />
                            </Box>
                        </Tooltip>
                    </Box>
                    <Typography
                        display="flex"
                        alignSelf="flex-end"
                        paddingLeft={3}
                        variant="h6"
                    >
                        A-Tier
                    </Typography>
                </Box>
                <Box
                    display="flex"
                    flexDirection="column"
                    gap={0}
                >
                    <span>Official streams:</span>
                    <StreamInfoList streamInfoArray={streamInfoArray} />
                </Box>
            </Box>
        </AccordionDetails>
    )
}

const WebLinksWithIcons = ({ webLinks }: { webLinks: WebLinks }) => {
    const imageDimensions = { width: 32, height: 26 }

    return (
        <Box
            alignItems="center"
            display="flex"
            flexDirection="row"
        >
            {webLinks.liquipedia ? (
                <Link
                    href={webLinks.liquipedia}
                    rel="noreferrer"
                    target="_blank"
                >
                    <IconButton>
                        <img
                            src={require("../assets/liquipedia.png")}
                            style={imageDimensions}
                        />
                    </IconButton>
                </Link>
            ) : null}
            {webLinks.twitter ? (
                <Link
                    href={webLinks.twitter}
                    rel="noreferrer"
                    target="_blank"
                >
                    <IconButton>
                        <img
                            src={require("../assets/twitter.png")}
                            style={imageDimensions}
                        />
                    </IconButton>
                </Link>
            ) : null}
            {webLinks.liquipedia ? (
                <Link
                    href={webLinks.liquipedia}
                    rel="noreferrer"
                    target="_blank"
                >
                    <IconButton>
                        <HomeIcon sx={{ transform: "scale(1.5)" }} />
                    </IconButton>
                </Link>
            ) : null}
        </Box>
    )
}

export default TourneyAccordionDetails
