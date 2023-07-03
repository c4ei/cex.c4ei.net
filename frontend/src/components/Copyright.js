import React from 'react'
import { Link, Typography } from "@mui/material"

export default function Copyright(props) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://c4ei.net/">
                c4ei.net
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    )
}