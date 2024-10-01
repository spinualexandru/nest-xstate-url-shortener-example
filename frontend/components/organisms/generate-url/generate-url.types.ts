import {FC, ChangeEventHandler} from 'react';

interface GenerateUrlTypes {
    onChange?: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> | undefined;
}

export type GenerateUrlProps = FC<GenerateUrlTypes>;