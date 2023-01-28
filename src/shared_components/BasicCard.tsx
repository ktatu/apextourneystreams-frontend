import * as React from "react"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import { textSpanContainsPosition } from "typescript"

export default function OutlinedCard({ text }: { text: string }) {
    const card = (
        <React.Fragment>
            <CardContent>
                <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                >
                    {text}
                </Typography>
                <Typography
                    variant="h5"
                    component="div"
                >
                    TESTI
                </Typography>
                <Typography
                    sx={{ mb: 1.5 }}
                    color="text.secondary"
                >
                    adjective
                </Typography>
                <Typography variant="body2">
                    well meaning and kindly.
                    <br />
                    jotain tekstiä
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
        </React.Fragment>
    )

    return (
        <Box
            id="box"
            sx={{ width: 275 }}
        >
            <Card variant="outlined">{card}</Card>
        </Box>
    )
}