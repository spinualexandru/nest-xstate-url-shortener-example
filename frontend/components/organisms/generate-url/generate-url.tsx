import {GenerateUrlProps} from './generate-url.types';
import {TextField, Grid2, Snackbar, Alert} from '@mui/material';
import {LoadingButton} from '@mui/lab';
import {NavigateNext, CopyAll} from '@mui/icons-material';
import {minifyUrlFormMachine} from "@/state/minifyMachine";
import {useEffect, useState} from "react";
import {useMachine} from '@xstate/react';

export const GenerateUrl: GenerateUrlProps = () => {
    const [state, send] = useMachine(minifyUrlFormMachine);
    const [showMinifiedUrl, setShowMinifiedUrl] = useState(false);
    const isProcessing = state.value === 'minifying';

    useEffect(() => {
        if (isProcessing) {
            setShowMinifiedUrl(true);
        }
        setTimeout(() => {
            setShowMinifiedUrl(false);
        }, 30000)
    }, [isProcessing]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        send({type: 'CHANGE', value: event.target.value})
    }

    const handleMinify = () => {
        send({type: 'MINIFY'})
    }

    const handleCopyUrl = () => {
        navigator.clipboard.writeText(`http://localhost:3000/${state.context.minifiedUrl}`);
    }

    return (
        <Grid2 container spacing={2}>
            <Grid2 size={12}>
                <TextField
                    label="Enter URL"
                    variant="outlined"
                    onChange={handleChange}
                    helperText={state.context.error}
                    error={!!state.context.error}
                    fullWidth
                />
            </Grid2>

            <Grid2 size={12}>
                <LoadingButton
                    loading={!!isProcessing}
                    loadingPosition={"start"}
                    endIcon={<NavigateNext/>}
                    size={"large"}
                    fullWidth
                    variant="contained"
                    onClick={handleMinify}
                >
                    Dwarfify
                </LoadingButton>
                <Snackbar open={showMinifiedUrl}>
                    <Alert
                        severity="success"
                        variant="filled"
                        sx={{width: '100%'}}
                    >
                        {`http://localhost:3000/${state.context.minifiedUrl}`}
                        <CopyAll sx={{paddingLeft: '8px', cursor: 'pointer'}} onClick={handleCopyUrl}/>
                    </Alert>
                </Snackbar>
            </Grid2>
        </Grid2>
    )
}