'use client';
import Grid from "@mui/material/Grid2";
import {Typography} from "@mui/material";
import {GenerateUrl} from "@/components/organisms/generate-url/generate-url";

export default function Home() {
    return (
        <Grid container spacing={2} display={'flex'} justifyContent={'center'} alignItems={'center'} height={"100vh"}>
            <Grid size={4}>
                <Typography
                    variant={"h3"}
                    textAlign={"center"}
                    fontFamily={"var(--font-geist-sans)"}
                    fontWeight={100}
                    paddingBottom={1}
                >
                    dwarfify.my/url
                </Typography>
                <GenerateUrl/>
            </Grid>
        </Grid>
    );
}
