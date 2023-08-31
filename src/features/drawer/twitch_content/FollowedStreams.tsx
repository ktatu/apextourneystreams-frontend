import StreamCard, { FollowedStream } from "./StreamCard"
import { Box, Stack } from "@mui/material"
import FilterByField from "./FilterByField"
import SortBySelect from "./SortBySelect"
import useStreamsFilterAndSort from "./useStreamsFilterAndSort"

interface FollowedStreamsProps {
    followedStreams: Array<FollowedStream>
}

const FollowedStreams = ({ followedStreams }: FollowedStreamsProps) => {
    const {
        filterType,
        filterValue,
        setFilterType,
        setFilterValue,
        setSortValue,
        sortValue,
        streams,
    } = useStreamsFilterAndSort(followedStreams)

    return (
        <Stack
            direction="column"
            gap={3}
        >
            <Box
                display="flex"
                gap={3}
                alignItems="center"
                paddingTop={2}
                paddingBottom={5}
            >
                <SortBySelect
                    sortValue={sortValue}
                    setSortValue={setSortValue}
                />
                <FilterByField
                    filterType={filterType}
                    filterValue={filterValue}
                    setFilterType={setFilterType}
                    setFilterValue={setFilterValue}
                />
            </Box>
            <Stack
                direction="column"
                gap={5}
            >
                {streams.map((stream) => (
                    <StreamCard
                        key={stream.loginName}
                        followedStream={stream}
                    />
                ))}
            </Stack>
        </Stack>
    )
}

export default FollowedStreams
